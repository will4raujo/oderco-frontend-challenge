import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/models/product.model";
import RelatedProduct from "@/components/molecules/related-product";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace('.', ',');
}

// Função para tratar a imagem em base64
const getImagePath = (image: string): string => {
  if (image && typeof image === 'string') {
    if (!image.startsWith("data:image")) {
      const isPng = image.includes("iVBORw0KGgo");
      const base64Prefix = isPng ? "data:image/png;base64," : "data:image/jpeg;base64,";
      return `${base64Prefix}${image}`;
    }
    return image; // Retorna a imagem original se já estiver no formato base64
  }
  return '/fallback-image.png'; // Imagem de fallback
}

async function getProduct(slug: string): Promise<Product[]> {
  const response = await fetch(`http://localhost:8080/products?slug=${slug}`, {
    next: {
      revalidate: 60 * 60,
    }
  });
  
  const product = await response.json();
  return product
}

export async function getStaticParams() {
  const response = await fetch(`http://localhost:8080/products`);
  const products = await response.json();

  return {
    paths: products.map((product: Product) => ({
      params: {
        slug: product.slug,
      },
    }))
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productArray = await getProduct(params.slug);
  const product = productArray[0];
  const imagePath = getImagePath(product.image);

  return (
    <main className="p-2 md:p-4 py-6 lg:p-10 max-w-[1440px] mx-auto">
          <h1 className="text-xl md:text-3xl uppercase">{product.name}</h1>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 my-6">
            <div className="w-[360px] h-[360px] bg-zinc-400 rounded-md overflow-hidden">
              <Image src={imagePath} alt={product.name || "imagem do produto"} width={360} height={360} className='hover:scale-105 transition-transform duration-300' />
            </div>
            <div className="flex flex-col justify-between lg:pr-8 my-6 md:my-0">
              <div className="flex flex-col gap-2 font-bold my-6 md:my-0">
                <span className="text-3xl md:text-5xl">R$ {formatPrice(product.price)}</span>
                <span className="text-md lg:text-xl min-w-[350px] lg:min-w-[440px]">Frete grátis para compras acima de R$ 900,00.</span>
              </div>

              <Button className="h-16 text-2xl mb-6">
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
            </div>
          </div>

          <h2 className="text-2xl uppercase mb-4">Descrição</h2>
          <p>{product.description}</p>
      <div className="flex flex-col gap-4 xl:hidden my-6">
        <h2 className="text-2xl uppercase">Produtos Relacionados</h2>
        <RelatedProduct />
        <RelatedProduct />
        <RelatedProduct />
        <RelatedProduct />
      </div>
    </main>
  );
}
