import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const method = event.node.req.method;
  const axios = createAxiosInstance(event);
  try {
    if (method === "GET") {
      const response = await axios({
        url: `/cart-items`,
      });
      return response.data;
    } else if (method === "POST") {
      const body = await readBody(event);
      const response = await axios(`/add-to-cart/`, {
        method: "POST",
        data: body,
      });
      return response.data;
    } else if (method === "DELETE") {
      const body = await readBody(event);
      const response = await axios(`/remove-from-cart/`, {
        method: "DELETE",
        data: body,
      });
      return response.data;
    } else if (method === "PATCH") {
      const body = await readBody(event);
      const response = await axios(`/update-cart-item/`, {
        method: "PATCH",
        data: body,
      });
      return response.data;
    } else {
      throw createError({
        statusCode: 405,
        statusMessage: "Method not allowed",
      });
    }
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
