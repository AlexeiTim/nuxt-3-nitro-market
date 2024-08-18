<script setup lang="ts">
import type { Product } from "~/types/product";

const cartStore = useCartStore();

defineProps<{
  status: string;
  products: Product[];
}>();
</script>

<template>
  <div v-if="status === 'pending'" class="product-grid">
    <ElSkeleton v-for="i in 10" :key="i" animated>
      <template #template>
        <ElSkeletonItem variang="image" style="width: 100%; height: 250px" />
      </template>
    </ElSkeleton>
  </div>
  <div v-else-if="status === 'error'">Error</div>
  <div v-else-if="!!products.length">
    <div class="text-red-300 product-grid">
      <ProductCard
        class="hover:scale-105"
        v-for="product in products"
        :key="product.id"
        :product="product"
        :has-in-cart="cartStore.hasProductInCart(product.id)"
      />
    </div>
  </div>
  <div v-else class="flex items-center justify-center">
    <ElTag>Empty</ElTag>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
</style>
