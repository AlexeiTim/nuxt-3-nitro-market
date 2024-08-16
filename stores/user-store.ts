import type { AuthData, LoginResponse } from "~/types/auth";
import type { User } from "~/types/user";

export const useUserStore = defineStore("userStore", () => {
  const user = ref<User | null>(null);
  const error = ref<any>(null);

  async function login(data: AuthData) {
    error.value = null;

    try {
      const res = await $fetch<LoginResponse>("/api/auth/login", {
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
      const userResponse = await $fetch<User>("/api/users/me");
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
      localStorage.removeItem("authToken");
      user.value = null;
    } catch (e) {
      error.value = e;
    }
  }

  async function register(data: AuthData) {
    error.value = null;
    try {
      const res = await $fetch<User>("/api/auth/register", {
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
