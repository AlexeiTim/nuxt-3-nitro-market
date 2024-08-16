<script setup lang="ts">
const userStore = useUserStore();

async function handleLogout() {
  await userStore.logout();
  if (userStore.error) return;

  navigateTo("/login");
}
</script>

<template>
  <header>
    <div class="container m-auto p-4 flex items-center justify-between">
      <AppLogo />
      <div class="flex items-center gap-4">
        <ThemeSwitcher />
        <ElButton v-if="!userStore.user" @click="handleLogout">Logout</ElButton>
        <p v-else>{{ userStore.user?.username }}</p>
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
