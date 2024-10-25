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
import { ProductsApi } from "@/services/products.service"
import { CategoriesApi } from "@/services/categories.service"
import AsideMobile from "@/components/atoms/aside-mobile"

export default function CatalogComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(12);
  const [sorting, setSorting] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [cache, setCache] = useState<{ [key: string]: Product[] }>({});
  const { getCatalogProducts } = ProductsApi;
  const { getCategories } = CategoriesApi;

  const fetchProducts = debounce(() => {
    const cacheKey = `${search}-${currentPage}-${sorting}-${priceRange}-${categoriesSelected.join(',')}`;

    if (cache[cacheKey]) {
      setProducts(cache[cacheKey]);
    } else {
      getCatalogProducts({ search, currentPage, itemsPerPage, sorting, priceRange, categoriesSelected }).then(({ products, totalItems }) => {
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
  }, [search, currentPage, sorting, priceRange, categoriesSelected, fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <main className="flex mx-auto mt-4">
        <AsideMobile isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
          <div className="flex gap-4 items-center overflow-x-auto scrollbar-none text-[#14b7dc]">
            {categories.map((category) => (
              <div key={category.id} className="flex gap-2 items-center min-w-[140px] h-full mt-1 pl-4">
                <Checkbox className="border-[#14b7dc]"
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
          </div>
        </AsideMobile>
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
          { products.length === 0 && (
            <p className="col-span-1 md:col-span-2 xl:col-span-4 text-center">Nenhum produto encontrado</p>
          )}
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