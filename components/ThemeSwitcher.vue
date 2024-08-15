<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { ElSwitch } from "element-plus";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const currentIcon = computed(() => (isDark.value ? Moon : Sunny));
const currentLabel = computed(() =>
  isDark.value ? "Switch to Light Mode" : "Switch to Dark Mode"
);
</script>

<template>
  <div class="flex items-center gap-1">
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
