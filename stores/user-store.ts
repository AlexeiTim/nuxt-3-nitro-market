import type { AuthData } from "~/types/auth";

export const useUserStore = defineStore("userStore", () => {
  const user = ref(null);
  const error = ref<any>(null);

  async function login(data: AuthData) {
    error.value = null;

    try {
      const res = await $fetch("/api/auth/login", {
        method: "POST",
        body: data,
      });
      const token = res.auth_token;
      localStorage.setItem("authToken", token);
      await getCurrentUser();
    } catch (e) {
      error.value = e;
    }
  }

  async function getCurrentUser() {
    error.value = null;

    try {
      const userResponse = await $fetch("/api/users/me");
      console.log(userResponse);
      user.value = userResponse;
    } catch (e) {
      error.value = e;
    }
  }

  async function logout() {
    error.value = null;
    try {
      await $fetch("/api/auth/logout");
      user.value = null;
    } catch (e) {
      error.value = e;
    }
  }

  async function register(data: AuthData) {
    error.value = null;
    try {
      const res = await $fetch("/api/auth/register", {
        method: "POST",
        body: data,
      });
      localStorage.setItem("authData", JSON.stringify(data));
      return res;
    } catch (e) {
      error.value = e;
    }
  }

  return {
    login,
    register,
    logout,
    getCurrentUser,
    user,
    error,
  };
});
