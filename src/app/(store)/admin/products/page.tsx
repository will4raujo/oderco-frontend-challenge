'use client';
import { Input } from '@/components/ui/input';
import { Search, EllipsisVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import { Product, columns } from "./columns";
import { DataTable } from './data-table';

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
  ]
}

export default async function ProductsPage() {
  const data = await getData();

  return (
    <main className='flex flex-col max-w-[1440px] px-10 my-4'>
      <h1 className='text-2xl font-bold'>Produtos</h1>
      <div className='flex gap-4 justify-between'>
        <div className='flex gap-4'>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-full xl:w-[50%] col-span-1 md:col-span-2 xl:col-span-4 relative">
            <Search className="absolute top-[18px] left-4 transform -translate-y-1/2" size={17} color="#141034" />
            <Input placeholder="Search" className="pl-10" />
          </div>
        </div>
        <Button className="">Cadastrar</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  )
}