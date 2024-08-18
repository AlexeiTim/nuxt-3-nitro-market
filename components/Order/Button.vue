<script setup lang="ts">
const ordersStore = useOrdersStore();
</script>

<template>
  <ElBadge class="w-full" :value="ordersStore.ordersCount" :hidden="!ordersStore.ordersCount">
    <ElButton class="w-full">Orders</ElButton>
  </ElBadge>
</template>

<style scoped></style>
