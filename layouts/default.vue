<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

function handleToggle() {
  toggleDark();
  console.log("toggle");
}
</script>

<template>
  <div class="w-full">
    <NuxtLoadingIndicator />
    {{ isDark }}
    <header class="container m-auto p-1 flex items-center justify-between">
      <ElButton @click="handleToggle">Switch theme</ElButton>
      <NuxtLink to="/" class="btn">Products</NuxtLink>
      <NuxtLink to="/cart" class="btn">Cart</NuxtLink>
    </header>

    <main class="container m-auto p-1 w-full">
      <slot />
    </main>
  </div>
</template>
