<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { ModalsContainer } from "vue-final-modal";
import { useWalletStore } from "~/stores/wallet-store";

const isDark = useDark();
const backgroundColor = useState("backgroundColor", () => "#ffffff");

const userStore = useUserStore();
const cartStore = useCartStore();
const orderStore = useOrdersStore();
const walletStore = useWalletStore();

onBeforeMount(async () => {
  await userStore.getCurrentUser();
  if (!userStore.user) return;

  cartStore.getCartItems();
  orderStore.getOrders();
  walletStore.getWallet();
});

onMounted(() => {
  backgroundColor.value = isDark.value ? "#222222" : "white";
});

watch(isDark, () => {
  if (isDark.value) backgroundColor.value = "#222222";
  else backgroundColor.value = "white";
});
</script>

<template>
  <div class="w-full">
    <ModalsContainer />
    <NuxtLoadingIndicator />
    <AppHeader
      :style="{ backgroundColor: backgroundColor }"
      class="sticky top-0 z-20 shadow-sm"
    />

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
