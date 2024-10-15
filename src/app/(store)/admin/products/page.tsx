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
  const response = await fetch('http://localhost:8080/products');
  return response.json();
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