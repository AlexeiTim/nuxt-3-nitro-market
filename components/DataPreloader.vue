<script setup lang="ts">
import { useOrdersStore } from "~/stores/orders-store";

const cartStore = useCartStore();
const orderStore = useOrdersStore();

useAsyncData("cart", () =>
  Promise.all([cartStore.getCartItems(), orderStore.getOrders()])
);
</script>

<template>
  <slot />
</template>

<style scoped></style>
