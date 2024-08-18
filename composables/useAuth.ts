import { notifyService } from "~/services/notify.service";
import type { AuthData } from "~/types/auth";

export function useAuth() {
  const userStore = useUserStore();
  const isLoading = ref(false);
  const authData = ref({
    username: "",
    password: "",
  });

  async function login() {
    isLoading.value = true;
    await userStore.login(authData.value);
    isLoading.value = false;

    if (userStore.error) {
      notifyService.error(userStore.error);
      return;
    }

    notifyService.success("Welcome, " + userStore.user?.username + "!");
    navigateTo("/");
  }

  async function register() {
    isLoading.value = true;
    await userStore.register(authData.value);
    isLoading.value = false;
    if (userStore.error) {
      notifyService.error(userStore.error);
      return;
    }

    navigateTo("/login");
  }

  onMounted(() => {
    const authDataLS = localStorage.getItem("authData");
    if (authDataLS) authData.value = JSON.parse(authDataLS);
  });

  return {
    login,
    register,
    authData,
    isLoading,
  };
}
