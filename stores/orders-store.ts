import type { Order, OrderCreateData } from "~/types/order";

export const useOrdersStore = defineStore("ordersStore", () => {
  const orders = ref<Order[]>([]);
  const error = ref<any>(null);

  async function getOrders() {
    error.value = null;
    try {
      const ordersResponse = await $fetch<Order[]>("/api/orders");
      return (orders.value = ordersResponse);
    } catch (e) {
      error.value = e;
    }
  }

  async function createOrder(body: OrderCreateData) {
    error.value = null;
    try {
      const response = await $fetch<Order>("/api/orders/", {
        method: "POST",
        body,
      });
      orders.value.push(response);
      return response;
    } catch (e) {
      error.value = e;
    }
  }

  async function cancelOrder(orderId: number) {
    error.value = null;

    const orderIndex = orders.value.findIndex((o) => o.id === orderId);
    if (orderIndex !== -1) orders.value.splice(orderIndex, 1);

    try {
      await $fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });
    } catch (e) {
      error.value = e;
    }
  }

  const ordersCount = computed(() => orders.value.length);
  return {
    orders,
    ordersCount,
    error,
    cancelOrder,
    createOrder,
    getOrders,
  };
});
