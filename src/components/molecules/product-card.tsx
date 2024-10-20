import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/models/product.model";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  let imagePath: string;
  const route = useRouter();

  const formatedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  if (product.image && typeof product.image === 'string') {
    if (!product.image.startsWith("data:image")) {
      const isPng = product.image.includes("iVBORw0KGgo");
      const base64Prefix = isPng ? "data:image/png;base64," : "data:image/jpeg;base64,";
      imagePath = `${base64Prefix}${product.image}`;
    } else {
      imagePath = product.image;
    }
  } else {
    imagePath = '/fallback-image.png';
  }

  const truncatedName = product.name.length > 44 ? product.name.substring(0, 44) + '...' : product.name;

  return (
    <Card 
      className="flex flex-col w-[260px] 2xl:w-[275px] gap-4 border-zinc-400 border-[1px] p-4 h-96 cursor-pointer"
      onClick={() => route.push(`/${product.slug}`)}
    >
      <div>
        <Image 
          src={imagePath || '/fallback-image.png'}
          alt="Product" 
          width={275}
          height={275}
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col h-full justify-between">
        <span className={`text-lg font-semibold max-h-[60px] text-ellipsis overflow-hidden line-clamp-3 break-words`}>{product.name}</span>
        <span className="text-xl font-bold">{formatedPrice}</span>
      </div>
    </Card>
  );
}
