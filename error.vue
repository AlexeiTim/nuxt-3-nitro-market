<script setup lang="ts">
defineProps(["error"]);

const handleGoHome = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="w-[100vw] h-[100vh] flex items-center justify-center">
    <ElCard class="w-[50vw] h-[50vh]">
      <div class="flex flex-col gap-4">
        <ElAlert type="error" :closable="false"
          >Error: {{ error.message }}</ElAlert
        >
        <ElButton type="info" @click="handleGoHome">Go To Products</ElButton>
      </div>
    </ElCard>
  </div>
</template>

<style scoped></style>
