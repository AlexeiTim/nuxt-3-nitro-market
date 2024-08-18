import { defineError } from "~/server/utils/defineError";
import { Order } from "~/types/order";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const method = event.node.req.method;

  try {
    if (method === "GET") {
      const response = await axios<Order[]>(`/orders/`);
      return response.data;
    } else if (method === "POST") {
      const body = await readBody(event);
      const response = await axios(`/orders/`, {
        method: "POST",
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
