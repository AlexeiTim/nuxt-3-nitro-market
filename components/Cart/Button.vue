<script setup lang="ts">
const cartStore = useCartStore();
</script>

<template>
  <ElBadge
    :value="cartStore.productCountInCart"
    :hidden="!cartStore.productCountInCart"
  >
    <ElButton class="w-full" icon="ShoppingCart"> Cart </ElButton>
  </ElBadge>
</template>

<style scoped></style>
