"use client"; 
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/models/product.model";
import RelatedProduct from "@/components/molecules/related-product";
import convertImagePath from '@/utils/convert-image-path';
import formatPrice from '@/utils/format-price';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/contexts/cart-context';
interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

async function fetchProduct(slug: string): Promise<Product[]> {
  const response = await fetch(`http://localhost:8080/products?slug=${slug}`);
  const product = await response.json();
  return product;
}

async function fetchRelatedProducts(categoryId: number): Promise<Product[]> {
  const response = await fetch(`http://localhost:8080/products?categoryId=${categoryId}`);
  const products = await response.json();
  return products;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  function handleAddToCart() {
    if (product) {
      addToCart(product.id);
      toast({ 
        description: "Produto adicionado ao carrinho!" });
    }
  }

  useEffect(() => {
    const loadProductData = async () => {
      const productArray = await fetchProduct(params.slug);
      const product = productArray[0];
      setProduct(product);

      if (product) {
        let relatedProducts = await fetchRelatedProducts(product.categoryId);
        relatedProducts = relatedProducts.filter((relatedProduct) => relatedProduct.id !== product.id);
        relatedProducts = relatedProducts.slice(0, 4);
        setRelatedProducts(relatedProducts);
      }
    };

    loadProductData();
  }, [params.slug]);

  if (!product) {
    return null;
  }

  const imagePath = convertImagePath(product.image);
  const formattedPrice = formatPrice(product.price);

  return (
    <main className="p-2 md:p-4 py-6 lg:p-10 max-w-[1440px] mx-auto">
      <h1 className="text-xl md:text-3xl uppercase">{product.name}</h1>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 my-6">
        <div className="w-[360px] h-[360px] bg-zinc-400 rounded-md overflow-hidden">
          <Image src={imagePath} alt={product.name || "imagem do produto"} width={360} height={360} className='hover:scale-105 transition-transform duration-300' />
        </div>
        <div className="flex flex-col justify-between lg:pr-8 my-6 md:my-0">
          <div className="flex flex-col gap-2 font-bold my-6 md:my-0">
            <span className="text-3xl md:text-5xl">{formattedPrice}</span>
            <span className="text-md lg:text-xl min-w-[350px] lg:min-w-[440px]">Frete grátis para compras acima de R$ 900,00.</span>
          </div>

          <Button className="h-16 text-2xl mb-6" onClick={handleAddToCart}>
            Adicionar ao Carrinho
            <ShoppingCart className="ml-4" />
          </Button>
        </div>
        <div className="hidden xl:flex flex-col gap-4">
          <h2 className="text-2xl uppercase">Produtos Relacionados</h2>
          {relatedProducts.map((relatedProduct) => (
            <RelatedProduct key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>

      <h2 className="text-2xl uppercase mb-4">Descrição</h2>
      <p>{product.description}</p>
      <div className="flex flex-col gap-4 xl:hidden my-6">
        <h2 className="text-2xl uppercase">Produtos Relacionados</h2>
        {relatedProducts.map((relatedProduct) => (
          <RelatedProduct key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </main>
  );
}
