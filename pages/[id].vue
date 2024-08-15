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

const addedToCart = computed(() => {
  const findedProduct = cartStore.cart.find((c) => c.id === product.value?.id);
  return !!findedProduct;
});

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
    <div v-else>
      <img :src="product.image_url" />
      <div>Product detail {{ product.id }}</div>
      <div>name: {{ product.name }}</div>
      <button
        v-if="!addedToCart"
        class="btn"
        @click="handleAddProductToCart(product)"
      >
        {{ "Добавить в корзину" }}
      </button>
      <button v-else @click="handleDeleteProductFromCart(product)">
        Уже в корзине, убрать?
      </button>
    </div>
  </div>
</template>

<style scoped></style>
