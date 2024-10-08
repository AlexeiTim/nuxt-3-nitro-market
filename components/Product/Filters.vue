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

const isShowFilters = ref(false);
</script>

<template>
  <ElCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3>Filters</h3>
        <ElButton @click="isShowFilters = !isShowFilters">
          {{ isShowFilters ? "Hide filters" : "Show filters" }}
        </ElButton>
      </div>
    </template>
    <Transition name="fade">
      <div v-show="isShowFilters">
        <ElForm label-position="top" class="flex flex-col">
          <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <ElFormItem label="Search">
              <ElInput
                v-model="filters.search"
                placeholder="Type..."
                clearable
                @input="handleInputSearch"
                suffix-icon="Search"
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
          <div class="grid grid-cols-1 md:grid-cols-3 md:gap-4">
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
        <div class="flex justify-end">
          <ElButton icon="CircleClose" @click="handleClearFilters"
            >Clear filters</ElButton
          >
        </div>
        <div>
          <slot />
        </div>
      </div>
    </Transition>
  </ElCard>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
