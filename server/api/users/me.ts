import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);

  try {
    const res = await axios.get("/users/me/");
    return res.data;
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
