<script setup lang="ts">
const { data: categories, status } = useFetch("api/categories");
const modelValue = defineModel();
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
