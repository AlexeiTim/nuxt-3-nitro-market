import { AxiosResponse } from "axios";
import { User } from "~/types/user";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const body = await readBody(event);

  try {
    const res = await axios.post<AxiosResponse<User>>("/users/", body);
    return res.data;
  } catch (e: any) {
    const statusCode = e.response?.status || 500;
    const statusMessage = e.response?.data || e.message || "Server Error";
    throw createError({
      statusCode,
      statusMessage: JSON.stringify(statusMessage),
    });
  }
});
