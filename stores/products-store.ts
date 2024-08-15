import type { TableData } from "~/types/api";
import type { Product, ProductParams } from "~/types/product";

export const useProductsStore = defineStore("productsStore", () => {
  const products = ref<Product[]>([]);
  const total = ref(0);

  async function getProducts(params?: ProductParams) {
    const data = await $fetch<TableData<Product>>("/api/products", {
      query: params,
    });
    total.value = data.count;
    return (products.value = data.results);
  }

  async function getProduct(id: number) {
    const product = await $fetch<Product>(`/api/products/${id}`);
    return product;
  }

  return {
    products,
    total,
    getProducts,
    getProduct,
  };
});
