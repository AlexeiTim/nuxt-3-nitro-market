<script setup lang="ts">
const { id } = useRoute().params;
</script>

<template>
  <div>
    <div>Product detail {{ id }}</div>
    <NuxtLink to="cart">Cart</NuxtLink>
    <NuxtLink to="/">Products</NuxtLink>
  </div>
</template>

<style scoped></style>
