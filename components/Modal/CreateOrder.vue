<script setup lang="ts">
import { ElFormItem } from "element-plus";
import { VueFinalModal } from "vue-final-modal";
import { notifyService } from "~/services/notify.service";
import { useOrdersStore } from "~/stores/orders-store";
import { useWalletStore } from "~/stores/wallet-store";

const cartStore = useCartStore();
const ordersStore = useOrdersStore();
const walletStore = useWalletStore();

const formData = ref({
  first_name: "",
  last_name: "",
  delivery_address: "",
});
const isCreateOrderLoading = ref(false);
const formRef = ref();
const formRules = ref({
  first_name: [{ required: true, message: "Field is required" }],
  last_name: [{ required: true, message: "Field is required" }],
  delivery_address: [{ required: true, message: "Field is required" }],
});

async function handleCreateOrder() {
  if (walletStore.wallet && walletStore.wallet.cash < cartStore.totalPrice) {
    notifyService.warning("Need more cash. Add in profile");
    return;
  }
  await formRef.value.validate();

  isCreateOrderLoading.value = true;
  await ordersStore.createOrder({
    ...formData.value,
    total_price: cartStore.totalPrice,
  });
  isCreateOrderLoading.value = false;

  if (ordersStore.error) {
    notifyService.error("Bad request");
    return;
  }

  await cartStore.getCartItems();
  await walletStore.getWallet();

  ElNotification({
    message: "Create order",
    type: "success",
  });
  emits("close");
}

const emits = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="w-[320px] h-[300px] gap-4 flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <h3>Order</h3>
        <ElIcon class="cursor-pointer" @click="emits('close')">
          <CircleClose />
        </ElIcon>
      </div>
      <ElForm
        ref="formRef"
        :rules="formRules"
        :model="formData"
        label-position="top"
      >
        <ElFormItem
          prop="first_name"
          v-model="formData.first_name"
          label="Firstname"
        >
          <ElInput v-model="formData.first_name" placeholder="Type firstname" />
        </ElFormItem>

        <ElFormItem
          prop="last_name"
          v-model="formData.last_name"
          label="Last Name"
        >
          <ElInput v-model="formData.last_name" placeholder="Type lastname" />
        </ElFormItem>

        <ElFormItem>
          <ElInput
            v-model="formData.delivery_address"
            placeholder="Type delivery address"
          />
        </ElFormItem>
      </ElForm>
      <div class="flex items-end flex-col justify-between">
        <p class="text-sm">Total: {{ cartStore.totalPrice }} Br</p>
        <ElButton :loading="isCreateOrderLoading" @click="handleCreateOrder">
          Create Order
        </ElButton>
      </div>
    </div>
  </VueFinalModal>
</template>
