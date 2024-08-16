<script setup lang="ts">
import { useOrdersStore } from "~/stores/orders-store";

const oridersStore = useOrdersStore();
const { $moment } = useNuxtApp();
</script>

<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-center">Orders</h1>
    <template v-if="oridersStore.ordersCount">
      <ElCard v-for="order in oridersStore.orders" :key="order.id">
        <div class="flex justify-between">
          <div>
            <p>
              Date order:
              {{ $moment(order.created_at).format("DD.MM.YY HH:mm:ss") }}
            </p>
            <div>
              <h3>Cunsumer</h3>
              <p>Firstname: {{ order.first_name }}</p>
              <p>Lastname: {{ order.last_name }}</p>
            </div>
          </div>
          <ElTooltip content="Cancel order" placement="top">
            <ElButton
              icon="Delete"
              type="danger"
              circle
              @click="oridersStore.cancelOrder(order.id)"
            />
          </ElTooltip>
        </div>
      </ElCard>
    </template>
    <div v-else class="flex items-center justify-center">
      <ElTag>Empty</ElTag>
    </div>
  </div>
</template>

<style scoped></style>
