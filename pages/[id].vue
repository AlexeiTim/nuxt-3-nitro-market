<script setup lang="ts">
import { ElSkeleton } from "element-plus";
import { useCartStore } from "~/stores/cart-store";
import type { Product } from "~/types/product";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const { data: product, status } = useAsyncData(() =>
  productsStore.getProduct(+route.params.id)
);

function handleAddProductToCart(product: Product) {
  cartStore.addProduct(product);
}

function handleDeleteProductFromCart(product: Product) {
  cartStore.deleteProduct(product.id);
}

if (!product)
  throw createError({
    statusCode: 404,
    message: "Не удалось найти продукт",
    fatal: true,
  });
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      <ElSkeleton />
    </div>
    <div v-if="product">
      <img :src="product.image_url" />
      <div>Product detail {{ product.id }}</div>
      <div>name: {{ product.name }}</div>
      <ElButton
        :loading="cartStore.addingProductsToCartIdList.includes(product.id)"
        type="primary"
        class="w-full"
        :disabled="cartStore.hasProductInCart(product.id)"
        @click.stop.prevent="cartStore.addProduct(product)"
      >
        {{ !cartStore.hasProductInCart(product.id) ? "Add to cart" : "Added" }}
      </ElButton>
    </div>
  </div>
</template>

<style scoped></style>
