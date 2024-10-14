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
        </div>
        <Button className="">Cadastrar</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  )
}