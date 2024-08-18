<script setup lang="ts">
definePageMeta({
  layout: "empty",
});

const { login, isLoading, authData } = useAuth();

const formRef = ref();
const formRules = ref({
  username: [{ required: true, message: "Required field" }],
  password: [{ required: true, message: "Required field" }],
});

async function handleLogin() {
  await formRef.value.validate();
  await login();
}
</script>

<template>
  <div class="size-full h-[100vh] flex items-center justify-center">
    <ElCard class="w-[90vw] md:w-[40vw]">
      <h1 class="text-center text-2xl">Login</h1>
      <ElForm
        ref="formRef"
        :rules="formRules"
        :model="authData"
        label-position="top"
      >
        <ElFormItem label="Username" prop="username">
          <ElInput v-model="authData.username" placeholder="Type username" />
        </ElFormItem>

        <ElFormItem label="Password" prop="password">
          <ElInput
            v-model="authData.password"
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
