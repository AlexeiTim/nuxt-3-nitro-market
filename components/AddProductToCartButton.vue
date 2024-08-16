<script setup lang="ts">
import { notifyService } from "~/services/notify.service";
import type { Product } from "~/types/product";

const props = defineProps<{
  product: Product;
}>();

const userStore = useUserStore();
const cartStore = useCartStore();
const isLoading = ref(false);

async function handleAddToCart() {
  if (!userStore.user) {
    notifyService.warning("Need authorization");
    return;
  }
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
