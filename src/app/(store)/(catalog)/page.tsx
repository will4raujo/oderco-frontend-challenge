'use client'
import ProductCard from "@/components/molecules/product-card"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"
import { Product } from "@/models/product.model"
import { useEffect, useState } from "react"

async function getData(): Promise<Product[]> {
  try {
    const response = await fetch('http://localhost:8080/products');
    return response.json();
  } catch (error) {
    console.error(error);
    alert('Verifique se o comando "npm run start:json-server" está rodando, caso contrário, acesse o arquivo README.md para mais informações');
    return [];
  }
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    getData().then(setProducts);
  }, []);
  return (
    <>
      <main className="flex mx-auto">
        <aside className="hidden px-2 2xl:px-4 py-6 h-full w-60 xl-64 lg:flex flex-col gap-6">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Card className="h-full flex flex-col gap-4 border-zinc-400 border-[1px] p-4">
            <div>
              <span>Preço</span>
              <span>R$ 0 a R$ 10.000,00</span>
              <Slider max={10000} step={1000} />
            </div>

            <span>Categorias</span>

            <div className="flex gap-2 items-center">
              <Checkbox id="eletronicos" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="eletronicos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Eletrônicos
                </label>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="eletronicos" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="eletronicos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Eletrônicos
                </label>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="eletronicos" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="eletronicos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Eletrônicos
                </label>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="eletronicos" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="eletronicos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Eletrônicos
                </label>
              </div>
            </div>
          </Card>
        </aside>
        <section className="py-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 grid-rows-[46px_auto]">
          <div className="w-full xl:w-[50%] col-span-1 md:col-span-2 xl:col-span-4 relative">
            <Search className="absolute top-[18px] left-4 transform -translate-y-1/2" size={17} color="#141034"/>
            <Input placeholder="Search" className="pl-10"/>
          </div>
          {
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </section>
      </main>
      <footer className="pb-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </footer>
    </>
  )
}