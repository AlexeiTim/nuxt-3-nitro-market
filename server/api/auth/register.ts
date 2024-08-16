import { AxiosResponse } from "axios";
import { User } from "~/types/user";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const body = await readBody(event);

  try {
    const res = await axios.post<AxiosResponse<User>>("/users/", body);
    return res.data;
  } catch (e: any) {
    throw createError({
      statusCode: e?.response.statusCode || 500,
      statusMessage: e.response.message || "Server Error",
    });
  }
});
