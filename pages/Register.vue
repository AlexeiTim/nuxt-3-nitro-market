<script setup lang="ts">
import { useUserStore } from "~/stores/user-store";

const userStore = useUserStore();
const formData = ref({
  username: "",
  password: "",
});
const isLoading = ref(false);
const formRef = ref();
const formRules = ref({
  username: [{ required: true, message: "Required field" }],
  password: [
    { required: true, message: "Required field", min: 8, trigger: "blur" },
  ],
});

async function handleRegister() {
  isLoading.value = false;
  await userStore.register(formData.value);
  isLoading.value = true;
  if (userStore.error) return;

  navigateTo("/login");
}

definePageMeta({
  layout: "empty",
});
</script>

<template>
  <div class="size-full h-[100vh] flex items-center justify-center">
    <ElCard class="w-[90vw] md:w-[40vw]">
      <h1 class="text-center text-2xl">Registation</h1>
      <ElForm
        ref="formRef"
        :rules="formRules"
        :model="formData"
        label-position="top"
      >
        <ElFormItem label="Username" prop="username">
          <ElInput v-model="formData.username" placeholder="Type username" />
        </ElFormItem>

        <ElFormItem label="Password" prop="password">
          <ElInput
            v-model="formData.password"
            placeholder="Type password"
            type="password"
            show-password
          />
        </ElFormItem>
        <div class="flex items-center justify-between">
          <p>
            Have account?
            <ElLink>
              <NuxtLink to="/login"> Login </NuxtLink>
            </ElLink>
          </p>
          <ElButton :loading="isLoading" type="primary" @click="handleRegister">
            Register
          </ElButton>
        </div>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped></style>
