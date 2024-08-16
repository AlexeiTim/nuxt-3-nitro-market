<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";

const userStore = useUserStore();

await useAsyncData("user", () => userStore.getCurrentUser());
</script>

<template>
  <div class="w-full">
    <ModalsContainer />
    <DataPreloader>
      <NuxtLoadingIndicator />
      <AppHeader />

      <main class="container m-auto p-4 w-full">
        <slot />
      </main>
    </DataPreloader>
  </div>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
