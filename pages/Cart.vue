<script setup lang="ts">
import { useCartStore } from "~/stores/cart-store";

const cartStore = useCartStore();
</script>

<template>
  <div v-if="!cartStore.cart.length">Пусто</div>
  <div class="flex flex-col gap-4" v-else>
    <div v-for="cart in cartStore.cart" :key="cart.id">
      {{ cart.name }}
    </div>
  </div>
</template>

<style scoped></style>
