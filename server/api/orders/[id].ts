import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const id = +event.context.params!.id;

  try {
    const res = await axios(`/orders/${id}/`, {
      method: "DELETE",
    });
    return res.data;
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
