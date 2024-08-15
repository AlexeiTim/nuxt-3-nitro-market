<script setup lang="ts">
const { data: brands } = useFetch("/api/brands");
const modelValue = defineModel();
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
