<script setup lang="ts">
import { useOrdersStore } from "~/stores/orders-store";

const ordersStore = useOrdersStore();

useHead({
  title: "Orders",
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-center">Orders</h1>
    <template v-if="ordersStore.ordersCount">
      <OrderCard v-for="order in ordersStore.orders" :order="order" />
    </template>
    <div v-else class="flex items-center justify-center">
      <ElTag>Empty</ElTag>
    </div>
  </div>
</template>

<style scoped></style>
