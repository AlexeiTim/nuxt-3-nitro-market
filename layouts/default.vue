<script setup lang="ts"></script>

<template>
  <div>
    <header class="flex items-center justify-between">
      <NuxtLink to="/">Products</NuxtLink>
      <NuxtLink to="/cart">Cart</NuxtLink>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped></style>
