import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function CatalogPage() {
  return (
    <main className="bg-blue-400">
      <aside className="px-4 py-6 h-full w-60 flex flex-col gap-6">
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
        <Slider max={10000} step={1000}  />
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
    </main>
  )
}