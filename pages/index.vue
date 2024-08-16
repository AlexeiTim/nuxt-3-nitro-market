<script setup lang="ts">
import type { ProductParams } from "~/types/product";

const productsStore = useProductsStore();
const userStore = useUserStore();

const filters = ref<ProductParams>({});
await useAsyncData("user", () => userStore.getCurrentUser());

const { status, refresh } = useAsyncData("products", () =>
  productsStore.getProducts(clearParams(filters.value))
);

const products = computed(() => productsStore.products);
const totalProducts = computed(() => productsStore.total);

function handleChangeFilter() {
  refresh();
}

function handleChangePage() {
  refresh();
}

useHead({
  title: "Products",
});
</script>

<template>
  <div class="w-full flex flex-col gap-4 h-full">
    <ProductFilters v-model="filters" @change-filters="handleChangeFilter">
      <ElPagination
        v-if="!!products.length"
        layout="total, prev, pager, next"
        :total="totalProducts"
        v-model:currentPage="filters.page"
        @current-change="handleChangePage"
      />
    </ProductFilters>
    <ProductList :products="products" :status="status" />
    <ElPagination
      v-if="!!products.length"
      layout="total, prev, pager, next"
      :total="totalProducts"
      v-model:currentPage="filters.page"
      @current-change="handleChangePage"
    />
  </div>
</template>

<style scoped></style>
