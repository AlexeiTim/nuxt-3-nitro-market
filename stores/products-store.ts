import type { TableData } from "~/types/api";
import type { Product } from "~/types/product";

export const useProductsStore = defineStore("productsStore", () => {
  const products = ref<Product[]>([]);

  async function getProducts() {
    const data = await $fetch<TableData<Product>>("/api/products");
    return (products.value = data.results);
  }

  async function getProduct(id: number) {
    const product = await $fetch<Product>(`/api/products/${id}`);
    return product;
  }

  return {
    products,
    getProducts,
    getProduct,
  };
});
