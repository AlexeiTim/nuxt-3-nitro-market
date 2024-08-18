import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const axios = createAxiosInstance(event);

  try {
    const res = await axios.post("/reviews/", body);
    return res.data;
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
