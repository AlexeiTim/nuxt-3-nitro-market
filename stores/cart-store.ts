import type { CartItem } from "~/types/cart";
import type { Product } from "~/types/product";

export const useCartStore = defineStore("cartStore", () => {
  const cart = ref<CartItem[]>([]);
  const addingProductsToCartIdList = ref<number[]>([]);
  async function getCartItems() {
    const cartItems = await $fetch<CartItem[]>("/api/cart-items");
    cart.value = cartItems;
  }

  const removeProductFromCart = async (productId: number) => {
    try {
      await $fetch("/api/cart-items", {
        method: "DELETE",
        body: {
          product_id: productId,
        },
      });
      cart.value = cart.value.filter((c) => c.product.id !== productId);
    } catch (e) {
      console.error(e);
    }
  };

  const updateProductQuantity = async (
    cartItemId: number,
    quantity: number
  ) => {
    const response = await $fetch(`/api/cart-items/${cartItemId}/`, {
      method: "PATCH",
      body: {
        quantity,
      },
    });
    if (!response) {
      cart.value = cart.value.filter((c) => c.id !== cartItemId);
      return;
    }
    const cartIndex = cart.value.findIndex((c) => c.id === cartItemId);

    if (cartIndex === -1) return;
    cart.value[cartIndex] = response;
  };

  const addProduct = async (product: Product) => {
    addingProductsToCartIdList.value.push(product.id);
    const response = await $fetch("/api/cart-items", {
      method: "POST",
      body: {
        product_id: product.id,
        quantity: 1,
      },
    });
    const cartItem = cart.value.find((cart) => cart.product.id === product.id);
    if (cartItem) cartItem = response;
    else cart.value.push(response);
    const indexLoading = addingProductsToCartIdList.value.findIndex(
      (c) => c === product.id
    );
    addingProductsToCartIdList.value.splice(indexLoading, 1);
  };

  const deleteProduct = (id: number) => {
    const cartIndex = cart.value.findIndex((c) => c.id === id);
    if (cartIndex === -1) return;
    cart.value.splice(cartIndex, 1);
  };

  const hasProductInCart = computed(() => (id: number) => {
    return cart.value.some((c) => c.product.id === id);
  });

  const cartProductIdList = computed(() => cart.value.map((c) => c.product.id));

  return {
    cart,
    addProduct,
    deleteProduct,
    getCartItems,
    removeProductFromCart,
    updateProductQuantity,
    cartProductIdList,
    hasProductInCart,
    addingProductsToCartIdList,
  };
});
