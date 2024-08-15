<script setup lang="ts">
const productsStore = useProductsStore();

const { data: products, status } = useAsyncData("products", () =>
  productsStore.getProducts()
);
</script>

<template>
  <div v-if="status === 'pending'">Loading....</div>
  <div v-else-if="status === 'error'">Error</div>
  <div v-else class="text-red-300 grid grid-cols-3 gap-4">
    <NuxtLink
      v-for="product in products"
      :key="product"
      :to="`/${product.id}`"
      class="card"
    >
      <div>
        <img :src="product.image_url" width="50" height="50" />
        <p>{{ product.name }}</p>
      </div>
    </NuxtLink>
  </div>
</template>
<style scoped></style>
