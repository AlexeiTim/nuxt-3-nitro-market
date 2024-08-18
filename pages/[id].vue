<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { useCartStore } from "~/stores/cart-store";
import AddProductToCartButton from "../components/AddProductToCartButton.vue";
import DeleteProductFromCartButton from "~/components/DeleteProductFromCartButton.vue";

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
    <div v-if="status === 'pending'">
      <ElSkeleton class="flex gap-4 w-full" animated>
        <template #template>
          <div class="flex gap-4 w-full">
            <ElSkeletonItem variang="image" style="width: 40vw; height: 50vh" />
            <div class="flex flex-col gap-4 w-full">
              <ElSkeletonItem v-for="i in 5" :key="i" />
            </div>
          </div>
        </template>
      </ElSkeleton>
    </div>
    <div v-else-if="product" class="gap-4 flex flex-col md:flex-row">
      <ElCard class="w-[100vw] h-[50vh]">
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
    <ProductReviews v-if="product" :product="product" />
  </div>
</template>

<style scoped>
:deep(.el-card__body) {
  width: 100%;
  height: 100%;
}
</style>
