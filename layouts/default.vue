<script setup lang="ts">
import { ElButton } from "element-plus";
</script>

<template>
  <div class="w-full">
    <NuxtLoadingIndicator />
    <header class="container m-auto p-1 flex items-center justify-between">
      <NuxtLink to="/">Logo</NuxtLink>
      <div class="flex items-center gap-4">
        <ThemeSwitcher />
        <NuxtLink to="/cart">
          <ElButton icon="ShoppingCart"> Cart </ElButton>
        </NuxtLink>
      </div>
    </header>

    <main class="container m-auto p-1 w-full">
      <slot />
    </main>
  </div>
</template>
