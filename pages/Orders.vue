<script setup lang="ts">
import { useOrdersStore } from "~/stores/orders-store";

const oridersStore = useOrdersStore();
</script>

<template>
  <div>
    <div v-for="order in oridersStore.orders" :key="order.id">
      <p>Date: {{ order.created_at }}</p>
      <div>
        <h3>Cunsumer</h3>
        <p>Firstname: {{ order.first_name }}</p>
        <p>Lastname: {{ order.last_name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
