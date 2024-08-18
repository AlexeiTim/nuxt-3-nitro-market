<script setup lang="ts">
import { ElFormItem } from "element-plus";
import { VueFinalModal } from "vue-final-modal";

const emits = defineEmits<{
  (e: "close"): void;
}>();

const cartStore = useCartStore();
const { createOrder, isLoading } = useOrder();

const formData = ref({
  first_name: "",
  last_name: "",
  delivery_address: "",
});
const formRef = ref();
const formRules = ref({
  first_name: [{ required: true, message: "Field is required" }],
  last_name: [{ required: true, message: "Field is required" }],
  delivery_address: [{ required: true, message: "Field is required" }],
});

async function handleCreateOrder() {
  await formRef.value.validate();
  await createOrder(formData.value, () => {
    emits("close");
  });
}
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="w-[320px] h-[400px] gap-4 flex flex-col justify-between">
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
        <ElFormItem prop="first_name" label="Firstname">
          <ElInput v-model="formData.first_name" placeholder="Type firstname" />
        </ElFormItem>

        <ElFormItem prop="last_name" label="Last Name">
          <ElInput v-model="formData.last_name" placeholder="Type lastname" />
        </ElFormItem>

        <ElFormItem prop="delivery_address" label="Delivery address">
          <ElInput
            v-model="formData.delivery_address"
            placeholder="Type delivery address"
          />
        </ElFormItem>
      </ElForm>
      <div class="flex items-end flex-col justify-between">
        <p class="text-sm">Total: {{ cartStore.totalPrice }} Br</p>
        <ElButton :loading="isLoading" @click="handleCreateOrder">
          Create Order
        </ElButton>
      </div>
    </div>
  </VueFinalModal>
</template>
