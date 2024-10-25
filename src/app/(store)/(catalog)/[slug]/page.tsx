import ProductDetailComponent from '@/components/organisms/product-detail';
import { ProductDetailPageProps } from '@/models/page-props.model';
import { ProductsApi } from '@/services/products.service';
import { Metadata } from 'next';

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { getProductsWithSlug } = ProductsApi;
  const productArray = await getProductsWithSlug(params.slug);
  const product = productArray[0];

  return {
    title: product ? product.name : 'Detalhes do produto',
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <ProductDetailComponent params={params} />
  );
}
