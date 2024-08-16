<script setup lang="ts">
import { notifyService } from "~/services/notify.service";

const props = defineProps<{
  productId: number;
}>();

const userStore = useUserStore();
const cartStore = useCartStore();
const isLoading = ref(false);

async function handleDeleteProduct() {
  if (!userStore.user) {
    notifyService.warning("Need authorization");
    return;
  }
  isLoading.value = true;
  await cartStore.removeProductFromCart(props.productId);
  isLoading.value = false;
}
</script>

<template>
  <ElButton
    type="danger"
    class="w-full"
    :loading="isLoading"
    @click.stop.prevent="handleDeleteProduct"
    icon="Delete"
  >
    Delete product from cart
  </ElButton>
</template>

<style scoped></style>
