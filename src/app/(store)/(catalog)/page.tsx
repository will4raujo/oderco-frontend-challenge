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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"
import { Product } from "@/models/product.model"
import { useEffect, useState } from "react"
import { debounce } from "lodash"
import { Category } from "@/models/category.model"

async function getData(
  search: string,
  page: number,
  limit: number,
  sorting: string,
  priceRange: number[],
  categoriesSelected: number[]
): Promise<{ products: Product[], totalItems: number }> {
  try {
    let url = `http://localhost:8080/products?_page=${page}&_limit=${limit}`;

    if (search) {
      url += `&q=${search}`;
    }

    if (sorting) {
      url += `&_sort=${sorting}&_order=asc`;
    }

    if (priceRange.length === 2) {
      url += `&price_gte=${priceRange[0]}&price_lte=${priceRange[1]}`;
    }

    if (categoriesSelected.length > 0) {
      const categoriesQuery = categoriesSelected.map(cat => `categoryId=${cat}`).join('&');
      url += `&${categoriesQuery}`;
    }

    const response = await fetch(url);
    const products = await response.json();
    const totalItems = parseInt(response.headers.get('X-Total-Count') || '0', 10);

    return { products, totalItems };
  } catch (error) {
    console.error(error);
    alert('Verifique se o comando "npm run start:json-server" está rodando, caso contrário, acesse o arquivo README.md para mais informações');
    return { products: [], totalItems: 0 };
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('http://localhost:8080/categories');
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(12);
  const [sorting, setSorting] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [cache, setCache] = useState<{ [key: string]: Product[] }>({});

  const fetchProducts = debounce(() => {
    const cacheKey = `${search}-${currentPage}-${sorting}-${priceRange}-${categoriesSelected.join(',')}`;

    if (cache[cacheKey]) {
      setProducts(cache[cacheKey]);
    } else {
      getData(search, currentPage, itemsPerPage, sorting, priceRange, categoriesSelected).then(({ products, totalItems }) => {
        setProducts(products);
        setTotalItems(totalItems);
        setCache((prevCache) => ({ ...prevCache, [cacheKey]: products }));
      });
    }
  }, 300);

  const fetchCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  }

  useEffect(() => {
    fetchProducts();
  }, [search, currentPage, sorting, priceRange, categoriesSelected]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <main className="flex mx-auto">
        <aside className="hidden px-2 2xl:px-4 py-6 h-full w-60 2xl:w-64 lg:flex flex-col gap-6">
          <Select onValueChange={(value) => setSorting(value)} value={sorting}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updatedAt">Mais Recentes</SelectItem>
              <SelectItem value="name">Nome</SelectItem>
            </SelectContent>
          </Select>

          <Card className="h-full flex flex-col gap-4 border-zinc-400 border-[1px] p-4">
            <div className="flex justify-between">
              <span>Preço</span>
              <span>R$ {priceRange[0]} - R$ {priceRange[1]}</span>
            </div>
            <Slider
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value)}
            />

            <span>Categorias</span>
            {categories.map((category) => (
              <div key={category.id} className="flex gap-2 items-center">
                <Checkbox
                  id={category.id}
                  onCheckedChange={(checked) => {
                    setCategoriesSelected((prev) =>
                      checked ? [...prev, Number(category.id)] : prev.filter(id => id !== Number(category.id))
                    );
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {category.name}
                  </label>
                </div>
              </div>
            ))}
          </Card>
        </aside>
        <section className="py-6 grid grid-cols-1 md:grid-cols-2 2xl:min-w-[1148px] xl:grid-cols-4 gap-4 grid-rows-[46px_auto]">
          <div className="w-full xl:w-[50%] col-span-1 md:col-span-2 xl:col-span-4 relative">
            <Search className="absolute top-[18px] left-4 transform -translate-y-1/2" size={17} color="#141034" />
            <Input placeholder="Busca por nome" className="pl-10" value={search} onChange={(event) => setSearch(event.target.value)} />
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