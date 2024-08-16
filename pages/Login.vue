<script setup lang="ts">
import { useUserStore } from "~/stores/user-store";
import type { AuthData } from "~/types/auth";

const userStore = useUserStore();
const formData = ref({
  username: "",
  password: "",
});
const isLoading = ref(false);
const formRef = ref();
const formRules = ref({
  username: [{ required: true, message: "Required field" }],
  password: [{ required: true, message: "Required field" }],
});

async function handleLogin() {
  isLoading.value = true;
  await userStore.login(formData.value);
  isLoading.value = false;
  if (userStore.error) return;
  navigateTo("/");
}

definePageMeta({
  layout: "empty",
});

onMounted(() => {
  const authData = localStorage.getItem("authData");
  if (authData) formData.value = JSON.parse(authData);
});
</script>

<template>
  <div class="size-full h-[100vh] flex items-center justify-center">
    <ElCard class="w-[90vw] md:w-[40vw]">
      <h1 class="text-center text-2xl">Login</h1>
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
            Not have account?
            <ElLink>
              <NuxtLink to="/register"> Register </NuxtLink>
            </ElLink>
          </p>
          <ElButton :loading="isLoading" type="primary" @click="handleLogin">
            Login
          </ElButton>
        </div>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped></style>
