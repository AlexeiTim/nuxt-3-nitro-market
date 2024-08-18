import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const axios = createAxiosInstance(event);
  try {
    if (method === "PATCH") {
      const body = await readBody(event);
      const id = parseInt(event.context.params!.id);

      const response = await axios(`/cart-items/${id}/`, {
        method: "PATCH",
        data: body,
      });
      return response.data;
    }
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
