<script setup lang="ts">
const { id } = useRoute().params;
</script>

<template>
  <div>
    <div>Product detail {{ id }}</div>
  </div>
</template>

<style scoped></style>
