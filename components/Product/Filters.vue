<script setup lang="ts">
import { useDebounceFn } from "@vueuse/shared";
import { ratings } from "~/consts/product/ratings";
import { sortOptions } from "~/consts/product/sort-options";
import type { ProductParams } from "~/types/product";

const emits = defineEmits<{
  (e: "change-filters"): void;
}>();

const defaultFilters: ProductParams = {
  page: 1,
  category: "",
  brand: "",
  search: "",
  ordering: "",
  rating: "",
};

const filters = defineModel<ProductParams>({ default: {} });

function handleClearFilters() {
  filters.value = {
    ...defaultFilters,
  };
  emits("change-filters");
}

function handleChangeFilter() {
  filters.value.page = 1;
  emits("change-filters");
}

const handleInputSearch = useDebounceFn(() => {
  handleChangeFilter();
}, 400);
</script>

<template>
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
            @change="handleChangeFilter"
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
            @change="handleChangeFilter"
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
            @change="handleChangeFilter"
          />
        </ElFormItem>

        <ElFormItem label="Brand">
          <BrandsRequestSelect
            v-model="filters.brand"
            @change="handleChangeFilter"
          />
        </ElFormItem>
      </div>
    </ElForm>
    <div class="flex justify-between">
      <div>
        <slot />
      </div>

      <ElButton icon="CircleClose" @click="handleClearFilters"
        >Clear filters</ElButton
      >
    </div>
  </ElCard>
</template>

<style scoped></style>
