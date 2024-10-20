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

async function getData(search: string, page: number, limit: number): Promise<{ products: Product[], totalItems: number }> {
  try {
    let url = `http://localhost:8080/products?_page=${page}&_limit=${limit}`

    if (search) {
      url += `&q=${search}`
    }

    const response = await fetch(url)
    const totalItems = await fetch(`http://localhost:8080/products`).then(response => response.json()).then(data => data.length);
    const products = await response.json();

    return { products, totalItems };
  } catch (error) {
    console.error(error);
    alert('Verifique se o comando "npm run start:json-server" está rodando, caso contrário, acesse o arquivo README.md para mais informações');
    return { products: [], totalItems: 0 };
  }
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const fetchProducts = () => {
    getData(search, currentPage, itemsPerPage).then(({ products, totalItems }) => {
      setProducts(products);
      setTotalItems(totalItems);
    });
  }

  useEffect(() => {
    fetchProducts();
  }, [search, currentPage]);

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
            <Search className="absolute top-[18px] left-4 transform -translate-y-1/2" size={17} color="#141034" />
            <Input placeholder="Search" className="pl-10" value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          {
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }

        </section>
      </main>
      <footer className="pb-6">
      {totalPages > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
              </PaginationItem>
              {/* Exibir páginas */}
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </footer>
    </>
  )
}