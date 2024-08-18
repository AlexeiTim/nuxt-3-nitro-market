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
        <NuxtLink class="hidden sm:block" to="/orders" v-show="userStore.user">
          <OrderButton />
        </NuxtLink>
        <NuxtLink class="hidden sm:block" to="/cart" v-show="userStore.user">
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
            <div class="flex flex-col gap-4 p-4">
              <ElButton @click="handleLogout" class="w-full">Logout</ElButton>
              <NuxtLink to="/profile" class="w-full">
                <ElButton class="w-full">Profile</ElButton>
              </NuxtLink>
              <NuxtLink class="md:hidden block w-full" to="/orders" v-show="userStore.user">
                <OrderButton style="width:100%" class="w-full" />
              </NuxtLink>

              <NuxtLink to="/cart" v-show="userStore.user" class="w-full md:hidden block">
                <CartButton class="w-full" />
              </NuxtLink>
            </div>
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


<style scoped>
.el-dropdown-menu__item {
  display: none;
}
</style>