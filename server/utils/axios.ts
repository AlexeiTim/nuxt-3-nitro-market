// server/utils/axios.ts
import axios from "axios";
import { getCookie, H3Event } from "h3";

export const createAxiosInstance = (event: H3Event) => {
  const axiosInstance = axios.create({
    baseURL: useRuntimeConfig().public.baseApiUrl,
  });

  const token = getCookie(event, "authToken");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Token ${token}`;
  }

  axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
