<script setup lang="ts">
const { authData, isLoading, register } = useAuth();

const formRef = ref();
const formRules = ref({
  username: [{ required: true, message: "Required field" }],
  password: [
    {
      required: true,
      message: "Required field. Min length 8",
      min: 8,
      trigger: "blur",
    },
  ],
});

async function handleRegister() {
  await formRef.value.validate();
  await register();
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
