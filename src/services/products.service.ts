import { Product } from "@/models/product.model";
import { baseUrl } from "./api.service";

interface QueryParams {
  search: string;
  currentPage: number;
  itemsPerPage: number;
  sorting: string;
  priceRange: number[];
  categoriesSelected: number[];
}

const getProducts = async () => {
  try {
    const response = await fetch(baseUrl);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const productsUrl = baseUrl + '/products';

const getCatalogProducts = async (params: QueryParams) => {
  try {
    let url = `${productsUrl}?_page=${params.currentPage}&_limit=${params.itemsPerPage}`;
    console.log(url);

    if (params.search) {
      url += `&q=${params.search}`;
    }

    if (params.sorting) {
      url += `&_sort=${params.sorting}&_order=asc`;
    }

    if (params.priceRange.length === 2) {
      url += `&price_gte=${params.priceRange[0]}&price_lte=${params.priceRange[1]}`;
    }

    if (params.categoriesSelected.length > 0) {
      const categoriesQuery = params.categoriesSelected.map(cat => `categoryId=${cat}`).join('&');
      url += `&${categoriesQuery}`;
    }

    const response = await fetch(url);
    const products = await response.json();
    const totalItems = parseInt(response.headers.get('X-Total-Count') || '0', 10);

    if (products.length === 0) {
      return { products: [], totalItems: 0 };
    }

    return { products, totalItems };
  } catch (error) {
    console.error(error);
    return { products: [], totalItems: 0 };
  }
}

const getProductsWithSlug = async (slug: string) => {
  try {
    const response = await fetch(`${productsUrl}?slug=${slug}`);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getRelatedProducts = async (categoryId: number) => {
  try {
    const response = await fetch(`${productsUrl}?categoryId=${categoryId}`);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const create = async (product: Product) => {
  try {
    const response = await fetch(productsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const update = async (id: number, product: Product) => {
  try {
    const response = await fetch(`${productsUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const remove = async (id: number) => {
  try {
    const response = await fetch(`${productsUrl}/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getProductsFromCart = async (items: { productId: string }[]) => {
  if (items.length === 0) return [];
  const products = await fetch(`${productsUrl}?${items.map(item => `id=${item.productId}`).join('&')}`);
  return products.json();
}

export const ProductsApi = {
  getProducts,
  getCatalogProducts,
  getProductsWithSlug,
  getRelatedProducts,
  create,
  update,
  remove,
  getProductsFromCart,
}