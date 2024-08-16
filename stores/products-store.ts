import type { TableData } from "~/types/api";
import type { Product, ProductParams } from "~/types/product";

export const useProductsStore = defineStore("productsStore", () => {
  const products = ref<Product[]>([]);
  const total = ref(0);
  const error = ref<any>(null);

  async function getProducts(params?: ProductParams) {
    error.value = null;
    try {
      const data = await $fetch<TableData<Product>>("/api/products", {
        query: params,
      });
      total.value = data.count;
      return (products.value = data.results);
    } catch (e) {
      error.value = e;
    }
  }

  async function getProduct(id: number) {
    error.value = null;
    try {
      const product = await $fetch<Product>(`/api/products/${id}`);
      return product;
    } catch (e) {
      error.value = e;
    }
  }

  return {
    products,
    total,
    error,
    getProducts,
    getProduct,
  };
});
