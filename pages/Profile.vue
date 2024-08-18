<script setup lang="ts">
import { ElInput } from "element-plus";
import { useWalletStore } from "~/stores/wallet-store";

const walletStore = useWalletStore();

const cashAddCount = ref(0);

function handleAddCash() {
  if (!walletStore.wallet) return;

  walletStore.updateWalletCash(walletStore.wallet.id, {
    cash: +cashAddCount.value + +walletStore.wallet.cash,
  });
  cashAddCount.value = 0;
}
</script>

<template>
  <div v-loading="walletStore.isLoading">
    <template v-if="walletStore.wallet">
      <ElCard>
        <template #header>
          <p>Wallet</p>
        </template>
        <p>Cash: {{ walletStore.wallet.cash }} Br</p>
        <ElInput type="number" v-model="cashAddCount" />
        <template #footer>
          <ElButton @click="handleAddCash">Add cash</ElButton>
        </template>
      </ElCard>
    </template>
    <template v-else>
      <p>Create wallet?</p>
      <ElButton @click="walletStore.createWallet">Create</ElButton>
    </template>
  </div>
</template>

<style scoped></style>
