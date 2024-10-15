'use client';
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from './data-table';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp } from "lucide-react";
import { Category } from "@/models/category.model";
import { Toaster } from "@/components/ui/toaster"
import { Product } from "@/models/product.model";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import ReactLoading from 'react-loading';

async function getData(): Promise<Product[]> {
  const response = await fetch('http://localhost:8080/products');
  return response.json();
}

async function getCategoryOptions(): Promise<Category[]> {
  const response = await fetch('http://localhost:8080/categories');
  return response.json();
}

function formatToBRL(value: string) {
  const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
  return numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve conter no mínimo 3 caracteres' }),
  price: z.number().min(0.01, { message: 'O preço deve ser maior que 0' }),
  description: z.string().min(3, { message: 'A descrição deve conter no mínimo 3 caracteres' }),
  category: z.string().min(1, { message: 'Selecione uma categoria' }),
  image: z.string(),
})

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("R$ 0,00");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatToBRL(rawValue);
    setPrice(formattedValue);
  };

  const handleCategoryChange = (value: string) => {
    const category = categories.find((category) => category.id === value);
    setSelectedCategory(category || null);
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      console.log("File selected:", file.name);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productData = {
      name,
      price: parseFloat(price.replace(/[^0-9]/g, '')) / 100,
      description,
      category: selectedCategory?.name,
      image: "nome-da-imagem.png",
    };

    const validation = formSchema.safeParse(productData);
    if (!validation.success) {
      const newErrors = validation.error.flatten().fieldErrors;
      setErrors(newErrors);
      toast({ 
        description: "Por favor, corrija o(s) campo(s) em destaque.",
        variant: "destructive",
        title: "Erro ao cadastrar produto."
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar produto.');
      }
      setErrors({});
      toast({ description: "Produto cadastrado com sucesso!" });
      setOpen(false);
      setLoading(false);
    } catch (error) {
      toast({ description: "Erro ao cadastrar produto." });
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    async function fetchCategories() {
      const result = await getCategoryOptions();
      setCategories(result);
    }
    fetchData();
    fetchCategories();
  }, []);

  return (
    <main className='flex flex-col mx-auto lg:w-[1024px] xl:w-[1280px] 2xl:w-[1440px] px-10 my-4'>
      <h1 className='text-2xl font-bold'>Produtos</h1>
      <div className='flex gap-4 justify-end'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="px-10">Cadastrar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar produto</DialogTitle>
              <DialogDescription className="text-sm">Preencha os campos abaixo para cadastrar um novo produto.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="name" className={errors.name ? 'text-red-500' : ''}>
                    Nome
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                </div>
              </div>
              <div className="flex gap-4 items-end">
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div>
                  <Label htmlFor="price" className={errors.price ? 'text-red-500' : ''}>
                    Preço
                  </Label>
                  <Input
                    id="price"
                    type="text"
                    placeholder="Preço"
                    value={price}
                    onChange={handlePriceChange}
                    className={errors.price ? 'border-red-500' : ''}
                  />
                </div>
              </div>
              <Textarea
                placeholder="Descrição"
                minLength={3}
                maxLength={2500}
                className={`min-h-32 max-h-52 ${errors.description ? 'border-red-500' : ''}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex gap-4 items-center">
                <Input
                  id="image"
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <Button onClick={handleButtonClick} className={`flex gap-2 w-full text-center ${errors.image ? 'border-red-500' : ''} `} variant="outline" >
                  <ImageUp />
                  Escolher Imagem
                </Button>
              </div>
              <DialogFooter className="justify-start md:justify-between">
                <DialogClose asChild>
                  <Button type="reset" variant="secondary">
                    Fechar
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {loading ? <ReactLoading type="spin" color="#fff" height={20} width={20} /> : 'Cadastrar'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
      <Toaster />
    </main>
  )
}