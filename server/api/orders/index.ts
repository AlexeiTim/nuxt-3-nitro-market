import { Order } from "~/types/order";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const method = event.node.req.method;

  if (method === "GET") {
    const response = await $fetch<Order[]>(
      `${config.public.baseApiUrl}/orders`
    );
    return response;
  } else if (method === "POST") {
    const body = await readBody(event);
    console.log("method PSOT");
    const response = await $fetch(`${config.public.baseApiUrl}/orders/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } else {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }
});
