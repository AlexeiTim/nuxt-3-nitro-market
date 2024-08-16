<script setup lang="ts">
import { useCartStore } from "~/stores/cart-store";

const cartStore = useCartStore();

useHead({
  title: "Cart",
});
</script>

<template>
  <div v-if="!cartStore.cart.length" class="flex items-center justify-center">
    <ElTag type="primary">Cart is empty</ElTag>
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
