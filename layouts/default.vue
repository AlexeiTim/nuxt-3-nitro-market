<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { ElButton } from "element-plus";
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div class="w-full">
    <ModalsContainer />
    <CartPreloader>
      <NuxtLoadingIndicator />
      <header>
        <div class="container m-auto p-4 flex items-center justify-between">
          <AppLogo />
          <div class="flex items-center gap-4">
            <ThemeSwitcher />
            <NuxtLink to="/orders">
              <OrderButton />
            </NuxtLink>
            <NuxtLink to="/cart">
              <CartButton />
            </NuxtLink>
          </div>
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
