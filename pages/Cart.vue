<script setup lang="ts">
import { useCartStore } from "~/stores/cart-store";
import { useOrdersStore } from "~/stores/orders-store";

const cartStore = useCartStore();

useHead({
  title: "Cart",
});

const orderStore = useOrdersStore();

useAsyncData("cart", () =>
  Promise.all([cartStore.getCartItems(), orderStore.getOrders()])
);
</script>

<template>
  <div
    v-if="!cartStore.cart.length"
    class="flex items-center justify-center flex-col gap-2"
  >
    <ElTag type="primary">Cart is empty</ElTag>
    <NuxtLink to="/">
      <ElButton type="primary">Go to products?</ElButton>
    </NuxtLink>
  </div>
  <div v-else class="flex flex-col gap-4 w-full">
    <OrderCreateButton />
    <div class="grid grid-cols-2 gap-5">
      <CartProductCard
        :cart-item="cartItem"
        v-for="cartItem in cartStore.cart"
        :key="cartItem.id"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.el-card__body) {
  width: 100%;
  height: 100%;
}
</style>
