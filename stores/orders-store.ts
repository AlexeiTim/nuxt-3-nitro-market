import type { Order } from "~/types/order";

export const useOrdersStore = defineStore("ordersStore", () => {
  const orders = ref<Order[]>([]);

  async function getOrders() {
    const ordersResponse = await $fetch<Order[]>("/api/orders");
    return (orders.value = ordersResponse);
  }

  async function createOrder(body: { first_name: string; last_name: string }) {
    try {
      const response = await $fetch<Order>("/api/orders/", {
        method: "POST",
        body,
      });
      orders.value.push(response);
      return response;
    } catch (e) {}
  }

  async function cancelOrder(orderId: number) {
    const response = await $fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
    });
    return response;
  }

  const ordersCount = computed(() => orders.value.length);
  return {
    orders,
    ordersCount,
    cancelOrder,
    createOrder,
    getOrders,
  };
});
