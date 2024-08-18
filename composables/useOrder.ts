import { notifyService } from "~/services/notify.service";
import type { OrderCreateData } from "~/types/order";

export function useOrder() {
  const walletStore = useWalletStore();
  const ordersStore = useOrdersStore();
  const cartStore = useCartStore();
  const isLoading = ref(false);

  async function createOrder(
    orderData: Omit<OrderCreateData, "total_price">,
    cb: Function
  ) {
    if (walletStore.wallet && walletStore.wallet.cash < cartStore.totalPrice) {
      notifyService.warning("Need more cash. Add in profile");
      return;
    }

    isLoading.value = true;
    await ordersStore.createOrder({
      ...orderData,
      total_price: cartStore.totalPrice,
    });
    isLoading.value = false;

    if (ordersStore.error) {
      notifyService.error(ordersStore.error);
      return;
    }

    await cartStore.getCartItems();
    await walletStore.getWallet();

    ElNotification({
      message: "Create order",
      type: "success",
    });

    cb();
  }

  async function cancelOrder(orderId: number) {
    await ordersStore.cancelOrder(orderId);
    if (ordersStore.error) {
      notifyService.error(ordersStore.error);
      return;
    }

    await walletStore.getWallet();
    if (walletStore.error) {
      notifyService.error(walletStore.error);
      return;
    }
  }

  return {
    createOrder,
    cancelOrder,
    isLoading,
  };
}
