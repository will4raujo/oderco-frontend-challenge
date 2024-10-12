import RelatedProduct from "@/components/molecules/related-product"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

export default function ProductDetailPage() {
  return (
    <main className="p-2 md:p-4 py-6 lg:p-10 max-w-[1440px] mx-auto">
      <h1 className="text-xl md:text-3xl uppercase">Processador AMD Ryzen 7 7800X3D, 5.0GHz Max Turbo, Cache 104MB, AM5, 8 Núcleos, Vídeo Integrado - 100-100000910WOF</h1>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 my-6 lg:h-[400px]">
        <div className="w-[350px] h-[350px] lg:h-[400px] lg:w-[400px] bg-zinc-400" />
        <div className="flex flex-col justify-between lg:pr-32 my-6 md:my-0">
          <div className="flex flex-col gap-2 font-bold my-6 md:my-0">
            <span className="text-3xl md:text-5xl">R$ 3.999,00</span>
            <span className="text-md lg:text-xl min-w-[350px] lg:min-w-[440px]">Frete grátis para compras acima de R$ 900,00.</span>
          </div>

          <Button className="h-16 text-2xl">
            Adicionar ao Carrinho
            <ShoppingCart className="ml-4" />
          </Button>
        </div>
        <div className="hidden xl:flex flex-col gap-4">
          <h2 className="text-2xl uppercase">Produtos Relacionados</h2>
          <RelatedProduct />
          <RelatedProduct />
          <RelatedProduct />
          <RelatedProduct />
          <RelatedProduct />
        </div>
      </div>
      <h2 className="text-2xl uppercase mb-4">Descrição</h2>
      <p>
        O melhor processador para jogos, com tecnologia AMD 3D V-Cache para ainda mais desempenho em jogos.
        O processador de 8 núcleos que pode fazer tudo com desempenho incrível da AMD para os jogadores e criadores mais exigentes. Além disso, aproveite os benefícios da tecnologia AMD 3D V-Cache de última geração para baixa latência e ainda mais desempenho de jogo.
      </p>

      <div className="flex flex-col gap-4 xl:hidden my-6">
          <h2 className="text-2xl uppercase">Produtos Relacionados</h2>
          <RelatedProduct />
          <RelatedProduct />
          <RelatedProduct />
          <RelatedProduct />
          <RelatedProduct />
        </div>
    </main>
  )
}