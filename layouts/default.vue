<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { ModalsContainer } from "vue-final-modal";
import { useWalletStore } from "~/stores/wallet-store";

const userStore = useUserStore();
const cartStore = useCartStore();
const orderStore = useOrdersStore();
const walletStore = useWalletStore();
const isDark = useDark();

const styles = computed(() => ({
  backgroundColor: isDark.value ? "#222222" : "white",
}));

onBeforeMount(async () => {
  await userStore.getCurrentUser();
  cartStore.getCartItems();
  orderStore.getOrders();
  walletStore.getWallet();
});
</script>

<template>
  <div class="w-full">
    <ModalsContainer />
    <NuxtLoadingIndicator />
    <AppHeader :style="styles" class="sticky top-0 z-20 shadow-sm" />

    <main class="container m-auto p-4 w-full">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
