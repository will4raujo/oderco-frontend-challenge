'use client';
import { Button } from "@/components/ui/button";
import { Product, columns } from "./columns";
import { DataTable } from './data-table';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp } from "lucide-react";
 
async function getData(): Promise<Product[]> {
  // fetch data from an API
  return [
    {
      id: '1',
      name: 'Product 0',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '2',
      name: 'Product 1',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '3',
      name: 'Product 2',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '4',
      name: 'Product 3',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '5',
      name: 'Product 4',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '6',
      name: 'Product 5',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '7',
      name: 'Product 6',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '8',
      name: 'Product 7',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '9',
      name: 'Product 8',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '10',
      name: 'Product 9',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '11',
      name: 'Product 10',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '12',
      name: 'Product 11',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '13',
      name: 'Product 12',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '14',
      name: 'Product 13',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '15',
      name: 'Product 14',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '16',
      name: 'Product 15',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '17',
      name: 'Product 16',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '18',
      name: 'Product 17',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '19',
      name: 'Product 18',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '20',
      name: 'Product 19',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '21',
      name: 'Product 20',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
    {
      id: '22',
      name: 'Product 21',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'Category',
    },
  ]
}

function formatToBRL(value: string) {
  const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
  return numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>([]);
  const [price, setPrice] = useState("R$ 0,00");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatToBRL(rawValue);
    setPrice(formattedValue);
  };

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

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <main className='flex flex-col mx-auto lg:w-[1024px] xl:w-[1280px] 2xl:w-[1440px] px-10 my-4'>
      <h1 className='text-2xl font-bold'>Produtos</h1>
      <div className='flex gap-4 justify-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="px-10">Cadastrar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar produto</DialogTitle>
              <DialogDescription className="text-sm">Preencha os campos abaixo para cadastrar um novo produto.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="name">
                  Nome
                </Label>
                <Input
                  id="name"
                />
              </div>
            </div>
            <div className="flex gap-4 items-end">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Categoria 1</SelectItem>
                  <SelectItem value="2">Categoria 2</SelectItem>
                  <SelectItem value="3">Categoria 3</SelectItem>
                </SelectContent>
              </Select>
              <div>

              <Label htmlFor="price" className="">
                Preço
              </Label>
              <Input
                id="price"
                type="text"
                placeholder="Preço"
                value={price}
                onChange={handlePriceChange}
                />
                </div>
            </div>
            <Textarea placeholder="Descrição" minLength={3} maxLength={2500} className="min-h-32 max-h-52" />
            <div className="flex gap-4 items-center">
              <Input
                id="image"
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button onClick={handleButtonClick} className="flex gap-2 w-full text-center" variant="outline">
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
              <Button type="submit">Cadastrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  )
}