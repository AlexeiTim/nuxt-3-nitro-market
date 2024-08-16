<script setup lang="ts">
import type { Product } from "~/types/product";

defineProps<{
  product: Product;
  hasInCart: boolean;
}>();
</script>

<template>
  <ElCard>
    <NuxtLink :to="`/${product.id}`" class="block w-full h-full">
      <div
        class="flex flex-col items-center justify-between text-center w-full h-full gap-4"
      >
        <div class="rounded-full bg-white relative w-full h-[100px]">
          <div
            class="w-full h-[100px] bg-contain bg-center bg-no-repeat rounded-full"
            :style="{ backgroundImage: `url(${product.image_url})` }"
          />
        </div>
        <div class="flex flex-col justify-between h-full items-start w-full">
          <div class="flex flex-col h-full items-start w-full">
            <p class="text-start">{{ product.name }}</p>
            <p class="text-sm">{{ product.price }}Br</p>
            <ElRate disabled :model-value="product.rating" />
          </div>
          <AddProductToCartButton v-if="!hasInCart" :product="product" />
          <DeleteProductFromCartButton v-else :product-id="product.id" />
        </div>
      </div>
    </NuxtLink>
  </ElCard>
</template>

<style scoped>
:deep(.el-card__body) {
  height: 100%;
}
</style>
