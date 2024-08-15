export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const method = event.node.req.method;
  console.log("init request");
  if (method === "GET") {
    const cartItems = await $fetch(`${config.public.baseApiUrl}/cart-items`);
    return cartItems;
  } else if (method === "POST") {
    const body = await readBody(event);
    const response = await $fetch(`${config.public.baseApiUrl}/add-to-cart/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } else if (method === "DELETE") {
    const body = await readBody(event);
    const response = await $fetch(
      `${config.public.baseApiUrl}/remove-from-cart/`,
      {
        method: "DELETE",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } else if (method === "PATCH") {
    const body = await readBody(event);
    const response = await $fetch(
      `${config.public.baseApiUrl}/update-cart-item/`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } else {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed",
    });
  }
});
