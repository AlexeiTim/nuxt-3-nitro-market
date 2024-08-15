<script setup lang="ts">
import { useDebounceFn } from "@vueuse/shared";
import { ElFormItem, ElPagination, ElSkeleton } from "element-plus";

const productsStore = useProductsStore();

const defaultFilters = {
  page: 1,
  rating: null,
  category: null,
  brand: null,
  search: "",
  ordering: "",
};

const filters = ref({
  ...defaultFilters,
});

const { status, refresh } = useAsyncData("products", () =>
  productsStore.getProducts(clearParams(filters.value))
);

const products = computed(() => productsStore.products);
const totalProducts = computed(() => productsStore.total);

function handleClearFilters() {
  filters.value = {
    ...defaultFilters,
  };
  refresh();
}

function handleChangeCategory() {
  refresh();
}

function handleChangeBrand() {
  refresh();
}

function handleChangeRating() {
  refresh();
}

function handleChangeOrdering() {
  refresh();
}

function handleChangePage() {
  refresh();
}

const handleInputSearch = useDebounceFn(() => refresh(), 400);

const ratings = [1, 2, 3, 4, 5];

const sortOptions = [
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Rating: Low to High", value: "rating" },
  { label: "Rating: High to Low", value: "-rating" },
  { label: "Name: A to Z", value: "name" },
  { label: "Name: Z to A", value: "-name" },
];
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <ElCard>
      <template #header> Filters </template>

      <ElForm label-position="top" class="flex flex-col">
        <div class="grid grid-cols-2 gap-4">
          <ElFormItem label="Search">
            <ElInput
              v-model="filters.search"
              placeholder="Type..."
              clearbale
              @input="handleInputSearch"
            />
          </ElFormItem>

          <ElFormItem label="Ordering">
            <ElSelect
              v-model="filters.ordering"
              placeholder="Select ordering"
              @change="handleChangeOrdering"
            >
              <ElOption
                v-for="option in sortOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </ElSelect>
          </ElFormItem>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <ElFormItem label="Rating">
            <ElSelect
              v-model="filters.rating"
              placeholder="Select rating"
              clearable
              @change="handleChangeRating"
            >
              <ElOption
                v-for="rating in ratings"
                :key="rating"
                :value="rating"
                :label="rating"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="Category">
            <CategoriesRequestSelect
              v-model="filters.category"
              @change="handleChangeCategory"
            />
          </ElFormItem>

          <ElFormItem label="Brand">
            <BrandsRequestSelect
              v-model="filters.brand"
              @change="handleChangeBrand"
            />
          </ElFormItem>
        </div>
      </ElForm>
      <div class="flex justify-between">
        <ElPagination
          v-if="!!products.length"
          layout="total, prev, pager, next"
          :total="totalProducts"
          v-model:currentPage="filters.page"
          @current-change="handleChangePage"
        />
        <ElButton @click="handleClearFilters">Clear filters</ElButton>
      </div>
    </ElCard>
    <div v-if="status === 'pending'">
      <ElSkeleton />
      <ElSkeleton />
      <ElSkeleton />
      <ElSkeleton />
      <ElSkeleton />
      <ElSkeleton />
    </div>
    <div v-else-if="status === 'error'">Error</div>
    <div v-else-if="!!products.length">
      <div class="text-red-300 product-grid">
        <ElCard v-for="product in products" :key="product">
          <NuxtLink :to="`/${product.id}`" class="card">
            <div
              class="flex flex-col items-center text-center h-[200px] w-full"
            >
              <div
                class="w-[100px] h-full bg-contain bg-center bg-no-repeat"
                :style="{ backgroundImage: `url(${product.image_url})` }"
              />
              <p>{{ product.name }}</p>
              <p>{{ product.price }}</p>
              <p>{{ product.rating }}</p>
            </div>
          </NuxtLink>
        </ElCard>
      </div>
    </div>
    <div v-else>Empty</div>
    <ElPagination
      v-if="!!products.length"
      layout="total, prev, pager, next"
      :total="totalProducts"
      v-model:currentPage="filters.page"
      @current-change="handleChangePage"
    />
  </div>
</template>
<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
</style>
