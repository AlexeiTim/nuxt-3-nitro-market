import type { Wallet } from "~/types/wallet";

export const useWalletStore = defineStore("walletStore", () => {
  const wallet = ref<Wallet | null>(null);
  const error = ref<any>(null);
  const isLoading = ref(false);

  async function getWallet() {
    error.value = null;
    isLoading.value = true;
    try {
      const walletRes = await $fetch<Wallet[]>(`/api/wallets`);
      if (walletRes.length) return (wallet.value = walletRes[0]);
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }

  async function createWallet() {
    error.value = null;
    isLoading.value = true;
    try {
      const res = await $fetch<Wallet>("/api/wallets", {
        method: "POST",
      });
      wallet.value = res;
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateWalletCash(id: number, body: { cash: number }) {
    error.value = null;
    isLoading.value = true;
    try {
      const res = await $fetch<Wallet>(`/api/wallets/${id}`, {
        method: "PATCH",
        body,
      });
      wallet.value = res;
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    wallet,
    error,
    createWallet,
    updateWalletCash,
    getWallet,
  };
});
