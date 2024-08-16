<script setup lang="ts">
const ordersStore = useOrdersStore();
</script>

<template>
  <ElBadge :value="ordersStore.ordersCount" :hidden="!ordersStore.ordersCount">
    <ElButton>Orders</ElButton>
  </ElBadge>
</template>

<style scoped></style>
