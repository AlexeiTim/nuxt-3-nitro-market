<script setup lang="ts">
import { useCartStore } from "~/stores/cart-store";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const { data: product, status } = useAsyncData(async () =>
  productsStore.getProduct(+route.params.id)
);

if (!product)
  throw createError({
    statusCode: 404,
    message: "Not found Product",
    fatal: true,
  });

useHead({
  title: product.value?.name,
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <ProductDetailSkeleton v-if="status === 'pending'" />
    <ProductDetailCard v-else-if="product" :product="product" />
    <ProductReviews v-if="product" :product="product" />
  </div>
</template>

<style scoped>
:deep(.el-card__body) {
  width: 100%;
  height: 100%;
}
</style>
