<script setup lang="ts">
import { useModal } from "vue-final-modal";
import ModalCreateOrder from "~/components/Modal/CreateOrder.vue";

const { open, close } = useModal({
  component: ModalCreateOrder,
  attrs: {
    onClose() {
      close();
    },
  },
});
</script>

<template>
  <ElButton type="primary" @click="open">Create order</ElButton>
</template>

<style scoped></style>
