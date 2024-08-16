<script setup lang="ts">
import type { Brand } from "~/types/brand";

const { data: brands } = useFetch<Brand[]>("/api/brands");
const modelValue = defineModel<number | string>();
</script>

<template>
  <ElSelect
    v-model="modelValue"
    placeholder="Select brand"
    clearable
    filterable
  >
    <ElOption
      v-for="brand in brands"
      :key="brand.id"
      :value="brand.id"
      :label="brand.name"
    />
  </ElSelect>
</template>

<style scoped></style>
