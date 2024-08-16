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
      cart.value = cart.value.filter((c) => c.product.id !== productId);
      await $fetch("/api/cart-items", {
        method: "DELETE",
        body: {
          product_id: productId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateProductQuantity = async (
    cartItemId: number,
    quantity: number
  ) => {
    const cartIndex = cart.value.findIndex((c) => c.id === cartItemId);
    if (cartIndex === -1) return;
    cart.value[cartIndex].quantity = cart.value[cartIndex].quantity + quantity;

    if (cart.value[cartIndex].quantity < 1)
      cart.value = cart.value.filter((c) => c.id !== cartItemId);
    try {
      await $fetch<CartItem>(`/api/cart-items/${cartItemId}/`, {
        method: "PATCH",
        body: {
          quantity,
        },
      });
    } catch (e) {
      console.error(e);
    }
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
    getCartItems,
    removeProductFromCart,
    updateProductQuantity,
    cartProductIdList,
    hasProductInCart,
    totalPrice,
    productCountInCart,
  };
});
