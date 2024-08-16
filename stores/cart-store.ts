import type { CartItem } from "~/types/cart";
import type { Product } from "~/types/product";

export const useCartStore = defineStore("cartStore", () => {
  const cart = ref<CartItem[]>([]);
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
    const response = await $fetch<CartItem>(`/api/cart-items/${cartItemId}/`, {
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
    const response = await $fetch<CartItem>("/api/cart-items", {
      method: "POST",
      body: {
        product_id: product.id,
        quantity: 1,
      },
    });
    const cartItemIndex = cart.value.findIndex(
      (cart) => cart.product.id === product.id
    );
    if (cartItemIndex !== -1) cart.value[cartItemIndex] = response;
    else cart.value.push(response);
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

  const totalPrice = computed(() =>
    cart.value.reduce(
      (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
      0
    )
  );

  const productCountInCart = computed(() =>
    cart.value.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
  );

  return {
    cart,
    addProduct,
    deleteProduct,
    getCartItems,
    removeProductFromCart,
    updateProductQuantity,
    cartProductIdList,
    hasProductInCart,
    totalPrice,
    productCountInCart,
  };
});
