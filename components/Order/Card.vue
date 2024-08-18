<script setup lang="ts">
import { useWalletStore } from "~/stores/wallet-store";
import type { Order } from "~/types/order";

defineProps<{
  order: Order;
}>();

const ordersStore = useOrdersStore();
const walletStore = useWalletStore();

const { $moment } = useNuxtApp();

async function handleCancelOrder(order: Order) {
  await ordersStore.cancelOrder(order.id);
  await walletStore.getWallet();
}
</script>

<template>
  <ElCard>
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <p>
          Date order:
          {{ $moment(order.created_at).format("DD.MM.YY HH:mm:ss") }}
        </p>
        <div>
          <h3 class="text-semibold">Customer</h3>
          <p>Firstname: {{ order.first_name }}</p>
          <p>Lastname: {{ order.last_name }}</p>
        </div>
        <p>Total price: {{ order.total_price }} Br</p>
      </div>
      <ElTooltip content="Cancel order and return cash" placement="top">
        <ElButton
          icon="Delete"
          type="danger"
          circle
          @click="handleCancelOrder(order)"
        />
      </ElTooltip>
    </div>
  </ElCard>
</template>

<style scoped></style>
