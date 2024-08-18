<script setup lang="ts">
import type { Product } from "~/types/product";

defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
</script>

<template>
  <div class="gap-4 flex flex-col md:flex-row">
    <ElCard class="md:w-[100vw] h-[50vh]">
      <div
        class="bg-contain w-full h-full bg-center bg-no-repeat rounded-sm bg-white relative"
        :style="{ backgroundImage: `url(${product.image_url})` }"
      />
    </ElCard>

    <div
      class="flex-grow md:max-w-[50vw] md:min-w-[50vw] flex flex-col justify-between gap-2 md:items-start"
    >
      <div class="w-full">
        <h3 class="font-bold">{{ product.name }}</h3>
        <p class="w-full">{{ product.description }}</p>
      </div>
      <div class="flex flex-col items-start gap-3 w-full">
        <div class="flex justify-start gap-2 flex-col items-start">
          <p class="text-sm">
            Category:
            <ElTag type="primary">{{ product.category.name }}</ElTag>
          </p>
          <p>
            Brand: <ElTag type="success">{{ product.brand.name }}</ElTag>
          </p>
        </div>
        <ElRate :model-value="product.rating" disabled />
        <p>
          Price: <b>{{ product.price }} Br</b>
        </p>
        <AddProductToCartButton
          v-if="!cartStore.hasProductInCart(product.id)"
          :product="product"
        />
        <DeleteProductFromCartButton v-else :product-id="product.id" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
