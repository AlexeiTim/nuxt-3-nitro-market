import type { Product } from "~/types/product";

export const useCartStore = defineStore("cartStore", () => {
  const cart = ref<Product[]>([]);

  const addProduct = (product: Product) => {
    cart.value.push(product);
  };

  const deleteProduct = (id: number) => {
    const cartIndex = cart.value.findIndex((c) => c.id === id);
    if (cartIndex === -1) return;
    cart.value.splice(cartIndex, 1);
  };

  return {
    cart,
    addProduct,
    deleteProduct,
  };
});
