import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const id = +event.context.params!.id;

  try {
    await axios.delete(`/reviews/${id}/`);
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
