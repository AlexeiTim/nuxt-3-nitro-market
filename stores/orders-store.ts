import type { Order, OrderCreateData } from "~/types/order";

export const useOrdersStore = defineStore("ordersStore", () => {
  const orders = ref<Order[]>([]);

  async function getOrders() {
    const ordersResponse = await $fetch<Order[]>("/api/orders");
    return (orders.value = ordersResponse);
  }

  async function createOrder(body: OrderCreateData) {
    try {
      const response = await $fetch<Order>("/api/orders/", {
        method: "POST",
        body,
      });
      orders.value.push(response);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async function cancelOrder(orderId: number) {
    const orderIndex = orders.value.findIndex((o) => o.id === orderId);
    if (orderIndex !== -1) orders.value.splice(orderIndex, 1);

    await $fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
    });
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
