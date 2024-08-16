<script setup lang="ts">
import { useDark } from "@vueuse/core";

const activeIndex = ref("1");
</script>

<template>
  <div class="w-full">
    <CartPreloader>
      <NuxtLoadingIndicator />
      <header class="container m-auto p-4 flex items-center justify-between">
        <NuxtLink to="/">
          Logo
          <!-- <NuxtImg style="width: 100px" alt="Element logo" /> -->
        </NuxtLink>
        <div class="flex items-center gap-4">
          <ThemeSwitcher />

          <NuxtLink to="/cart">
            <CartButton />
          </NuxtLink>
        </div>
      </header>

      <main class="container m-auto p-4 w-full">
        <slot />
      </main>
    </CartPreloader>
  </div>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
