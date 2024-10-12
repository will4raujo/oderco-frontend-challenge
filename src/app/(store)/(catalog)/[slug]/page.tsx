import RelatedProduct from "@/components/molecules/related-product"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

export default function ProductDetailPage() {
  return (
    <main className="p-10 max-w-[1440px] mx-auto">
      <h1 className="text-3xl uppercase">Processador AMD Ryzen 7 7800X3D, 5.0GHz Max Turbo, Cache 104MB, AM5, 8 Núcleos, Vídeo Integrado - 100-100000910WOF</h1>
      <div className="flex gap-4 my-6">
        <div className="w-[400px] h-[400px] bg-zinc-400" />
        <div className="flex flex-col justify-between pr-32 min-w-">
          <div className="flex flex-col gap-2 font-bold">
            <span className="text-5xl">R$ 3.999,00</span>
            <span className="text-xl min-w-[440px]">Frete grátis para compras acima de R$ 900,00.</span>
          </div>

          <Button className="h-16 text-2xl">
            Adicionar ao Carrinho
            <ShoppingCart className="ml-4" />
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <RelatedProduct />
          <RelatedProduct />
          <RelatedProduct />
          <RelatedProduct />
          <RelatedProduct />
        </div>
      </div>
      <h2 className="text-2xl uppercase py-6">Descrição</h2>
      <p>
        O melhor processador para jogos, com tecnologia AMD 3D V-Cache para ainda mais desempenho em jogos.
        O processador de 8 núcleos que pode fazer tudo com desempenho incrível da AMD para os jogadores e criadores mais exigentes. Além disso, aproveite os benefícios da tecnologia AMD 3D V-Cache de última geração para baixa latência e ainda mais desempenho de jogo.
      </p>
    </main>
  )
}