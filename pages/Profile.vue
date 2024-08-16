<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <div>
    <h1>Profile</h1>
    <p>{{ userStore.user?.username }}</p>
  </div>
</template>

<style scoped></style>
