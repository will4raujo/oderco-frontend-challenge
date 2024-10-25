import { baseUrl } from "./api.service";

const categoriesUrl = baseUrl + '/categories';
const getCategories = async () => {
  try {
    const response = await fetch(categoriesUrl);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const CategoriesApi = { 
  getCategories
};