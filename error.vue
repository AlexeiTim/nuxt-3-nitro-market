<script setup lang="ts">
defineProps(["error"]);

const handleGoHome = () => clearError({ redirect: "/" });
</script>

<template>
  <div>
    Not Found: {{ error.message }}
    <button @click="handleGoHome">Go home</button>
  </div>
</template>

<style scoped></style>
