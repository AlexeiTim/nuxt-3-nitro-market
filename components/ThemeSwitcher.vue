<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { Moon, Sunny } from "@element-plus/icons-vue";

const isRendering = ref(true);
const isDark = useDark();

onMounted(() => {
  isRendering.value = false;
});
</script>

<template>
  <div v-if="!isRendering" class="flex items-center gap-1">
    <ElIcon :class="{ active: !isDark }">
      <Sunny />
    </ElIcon>
    <ElSwitch v-model="isDark" />
    <ElIcon :class="{ active: isDark }">
      <Moon />
    </ElIcon>
  </div>
</template>

<style scoped>
.active {
  color: #409eff;
}
</style>
