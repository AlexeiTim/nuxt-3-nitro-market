<script setup lang="ts">
import { useModal } from "vue-final-modal";
import ModalCreateOrder from "~/components/Modal/CreateOrder.vue";
import { notifyService } from "~/services/notify.service";
const userStore = useUserStore();

const { open, close } = useModal({
  component: ModalCreateOrder,
  attrs: {
    onClose() {
      close();
    },
  },
});

function handleOpen() {
  if (!userStore.user) {
    notifyService.warning("Need autorization");
    return;
  }
  open();
}
</script>

<template>
  <ElButton type="primary" @click="handleOpen">Create order</ElButton>
</template>

<style scoped></style>
