<script setup lang="ts">
const props = defineProps<{
  productId: number;
}>();

const cartStore = useCartStore();
const isLoading = ref(false);

async function handleDeleteProduct() {
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
