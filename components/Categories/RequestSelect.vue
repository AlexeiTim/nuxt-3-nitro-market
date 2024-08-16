<script setup lang="ts">
import type { Category } from "~/types/category";

const { data: categories } = useFetch<Category[]>("api/categories");
const modelValue = defineModel<number | string>({ default: "" });
</script>

<template>
  <ElSelect
    v-model="modelValue"
    placeholder="Select category"
    clearable
    filterable
  >
    <ElOption
      v-for="category in categories"
      :key="category.id"
      :value="category.id"
      :label="category.name"
    />
  </ElSelect>
</template>
