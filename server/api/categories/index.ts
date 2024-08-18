import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  try {
    const axios = createAxiosInstance(event);
    const res = await axios(`/categories`);
    return res.data;
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
