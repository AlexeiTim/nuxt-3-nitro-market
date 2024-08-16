<script setup lang="ts">
import type { Product } from "~/types/product";

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
const isLoading = ref(false);

async function handleAddToCart() {
  isLoading.value = true;
  await cartStore.addProduct(props.product);
  isLoading.value = false;
}
</script>

<template>
  <ElButton
    :loading="isLoading"
    type="primary"
    class="w-full"
    :disabled="cartStore.hasProductInCart(product.id)"
    @click.stop.prevent="handleAddToCart"
    icon="Plus"
  >
    {{ !cartStore.hasProductInCart(product.id) ? "Add to cart" : "Added" }}
  </ElButton>
</template>

<style scoped></style>
