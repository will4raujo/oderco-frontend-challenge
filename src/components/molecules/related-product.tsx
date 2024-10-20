import Link from "next/link"
import Image from "next/image"
import { Product } from "@/models/product.model"
import formatPrice from "@/utils/format-price";
import convertImagePath  from '@/utils/convert-image-path';

export default function RelatedProduct({ product }: { product: Product }) {
  const imagePath = convertImagePath(product.image);
  const formatedPrice = formatPrice(product.price);
  return (
    <Link href={`/${product.slug}`} className="flex items-center gap-4 lg:gap-8 h-[60px] w-[350px] lg:w-[400px] rounded-md border-zinc-400 border-[1px] p-1 hover:bg-zinc-400 hover:bg-opacity-10 cursor-pointer">
      <Image src={imagePath} alt={product.name || "imagem do produto"} width={50} height={50} className="rounded-md" />
      <div className="flex flex-col">
        <span className="truncate w-[280px] lg:w-[310px]">{product.name}</span>
        <span className="font-semibold">{formatedPrice}</span>
      </div>
    </Link>
  )
}