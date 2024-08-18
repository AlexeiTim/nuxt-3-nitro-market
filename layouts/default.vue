<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { ModalsContainer } from "vue-final-modal";

const userStore = useUserStore();
const isDark = useDark();

const styles = computed(() => ({
  backgroundColor: isDark.value ? "#222222" : "white",
}));

onBeforeMount(() => {
  userStore.getCurrentUser();
});
</script>

<template>
  <div class="w-full">
    <ModalsContainer />
    <DataPreloader>
      <NuxtLoadingIndicator />
      <AppHeader :style="styles" class="sticky top-0 z-20 shadow-sm" />

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
