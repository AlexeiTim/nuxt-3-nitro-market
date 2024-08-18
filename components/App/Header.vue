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
        <NuxtLink to="/orders" v-show="userStore.user">
          <OrderButton />
        </NuxtLink>
        <NuxtLink to="/cart" v-show="userStore.user">
          <CartButton />
        </NuxtLink>

        <ElDropdown placement="bottom-start" v-if="userStore.user">
          <ElAvatar :size="32">
            <ElIcon>
              <Avatar />
            </ElIcon>
          </ElAvatar>
          <template #dropdown>
            <p class="p-1 text-center">
              <span>{{ userStore.user.username }}</span>
            <p>1000 Br</p>
            </p>
            <ElDropdownItem @click="handleLogout" class="text-center">
              Logout
            </ElDropdownItem>
            <ElDropdownItem>
              <NuxtLink to="/profile"> Profile </NuxtLink>
            </ElDropdownItem>
          </template>
        </ElDropdown>
        <div v-else class="flex items-center gap-2">
          <NuxtLink to="/login">
            <ElButton>Sign in</ElButton>
          </NuxtLink>

          <NuxtLink to="/register">
            <ElButton type="primary">Sign up</ElButton>
          </NuxtLink>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped></style>
