<script setup lang="ts"></script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <header class="container m-auto p-1 flex items-center justify-between">
      <NuxtLink to="/" class="btn">Products</NuxtLink>
      <NuxtLink to="/cart" class="btn">Cart</NuxtLink>
    </header>

    <main class="container m-auto p-1">
      <slot />
    </main>
  </div>
</template>
