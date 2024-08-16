<script setup lang="ts">
const cartStore = useCartStore();

useAsyncData("cart", () => cartStore.getCartItems());
</script>

<template>
  <slot />
</template>

<style scoped></style>
