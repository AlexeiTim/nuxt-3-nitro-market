<script setup lang="ts">
import { ElButton } from "element-plus";
import { useCartStore } from "~/stores/cart-store";

const cartStore = useCartStore();

function handleRemoveProductFromCart(productId: number) {
  cartStore.removeProductFromCart(productId);
}

function handleDicrimentProductQuantity(cartItemId: number) {
  cartStore.updateProductQuantity(cartItemId, -1);
}

function handleIncrementProductQuantity(cartItemId: number) {
  cartStore.updateProductQuantity(cartItemId, 1);
}
</script>

<template>
  <div v-if="!cartStore.cart.length">Пусто</div>
  <div class="flex flex-col gap-4" v-else>
    <div v-for="cartItem in cartStore.cart" :key="cartItem.id">
      {{ cartItem?.product.name }}
      <ElButton @click="handleRemoveProductFromCart(cartItem?.product.id)"
        >Delete</ElButton
      >
      <ElButton @click="handleDicrimentProductQuantity(cartItem.id)"
        >-</ElButton
      >
      {{ cartItem.quantity }}
      <ElButton @click="handleIncrementProductQuantity(cartItem.id)"
        >+</ElButton
      >
    </div>
  </div>
</template>

<style scoped></style>
