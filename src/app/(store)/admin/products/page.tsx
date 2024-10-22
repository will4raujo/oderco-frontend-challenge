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
import { Toaster } from "@/components/ui/toaster";
import { Product } from "@/models/product.model";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import ReactLoading from 'react-loading';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

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
  image: z.string().min(1, { message: 'Selecione uma imagem' }),
})

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [price, setPrice] = useState("R$ 0,00");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>("");
  const [imageName, setImageName] = useState("");
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const user = localStorage.getItem('@wa-store:user');

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleDelete = (product: Product) => {
    fetch(`http://localhost:8080/products/${product.id}`, {
      method: 'DELETE',
    }).then(() => {
      setData((prevData) => prevData.filter((p) => p.id !== product.id));
      toast({ description: "Produto excluído com sucesso!" });
    }).catch(() => {
      toast({ description: "Erro ao excluir produto." });
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatToBRL(rawValue);
    setPrice(formattedValue);
  };

  const handleCategoryChange = (value: string) => {
    const categoryId = parseInt(value, 10);
    const category = categories.find((category) => category.id === categoryId);
    setSelectedCategory(category || null);
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    setIsFileInputVisible(true);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast({
          description: "Formato de imagem inválido. Apenas JPEG e PNG são aceitos.",
          variant: "destructive",
          title: "Erro ao selecionar imagem"
        });
        return;
      }

      if (file.name.length > 40) {
        setImageName(file.name.slice(0, 40) + '...');
      } else {
        setImageName(file.name);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setName("");
    setPrice("R$ 0,00");
    setSelectedCategory(null);
    setDescription("");
    setImage("");
    setImageName("");
    setErrors({});
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productData = {
      name,
      price: parseFloat(price.replace(/[^0-9]/g, '')) / 100,
      description,
      category: selectedCategory?.name,
      image,
      cretedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

    if (editingProduct) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
        if (!response.ok) {
          throw new Error('Erro ao editar produto.');
        }
        setErrors({});
        toast({ description: "Produto editado com sucesso!" });
        setOpen(false);
        setLoading(false);
        handleReset();
      } catch (error) {
        toast({ description: "Erro ao editar produto." });
        setLoading(false);
      }
      return;
    } else {
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
        handleReset();
      } catch (error) {
        toast({ description: "Erro ao cadastrar produto." });
        setLoading(false);
      }
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

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(formatToBRL(editingProduct.price.toString()));
      setDescription(editingProduct.description);
      setImage(editingProduct.image);
      setImageName(editingProduct.name);
      setSelectedCategory(categories.find((category) => category.id === editingProduct.categoryId) || null);
    }
  }, [editingProduct]);

  return (
    <>
      {user === null ?
        <div className="flex flex-col gap-10 items-center justify-center">
          <h1 className="text-2xl font-bold ">Você não está logado, por favor faça login para acessar esta página.</h1>
        </div>
        :
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
                          <SelectItem key={category.id} value={category.id.toString()}>
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
                    {isFileInputVisible && (
                      <Input
                        id="image"
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                    )}
                    <Button type="button" onClick={handleButtonClick} className={`overflow-hidden overflow-ellipsis flex gap-2 w-full text-center ${errors.image ? 'border-red-500' : ''} `} variant="outline" >
                      <ImageUp />
                      {imageName || 'Selecionar imagem'}
                    </Button>
                  </div>
                  <DialogFooter className="justify-start md:justify-between">
                    <DialogClose asChild>
                      <Button type="button" variant="destructive" onClick={() => setIsAlertDialogOpen(true)}>Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" disabled={loading} variant="default">
                      {loading ? <ReactLoading type="spin" color="#fff" height={20} width={20} /> : 'Cadastrar'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar Cadastro</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza de que deseja cancelar o cadastro do produto? Todas as informações não salvas serão perdidas.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Não</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    setOpen(false);
                    setIsAlertDialogOpen(false);
                    handleReset();
                  }}>
                    Sim
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <DataTable columns={columns({ handleEdit, handleDelete })} data={data} />
          <Toaster />
        </main>
      }
    </>
  )
}