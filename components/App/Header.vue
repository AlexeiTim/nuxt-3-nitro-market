<script setup lang="ts"></script>

<template>
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
</template>

<style scoped></style>
