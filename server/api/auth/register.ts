import { AxiosResponse } from "axios";
import { defineError } from "~/server/utils/defineError";
import { User } from "~/types/user";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const body = await readBody(event);

  try {
    const res = await axios.post<AxiosResponse<User>>("/users/", body);
    return res.data;
  } catch (e: any) {
    const error = defineError(e);
    throw createError(error);
  }
});
