<script setup lang="ts">
defineProps(["error"]);

const handleGoHome = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="size-full flex items-center justify-center">
    <ElCard class="w-[50vw] h-[50vh]">
      <ElAlert>Error: {{ error.message }}</ElAlert>
      <ElButton @click="handleGoHome">Go home</ElButton>
    </ElCard>
  </div>
</template>

<style scoped></style>
