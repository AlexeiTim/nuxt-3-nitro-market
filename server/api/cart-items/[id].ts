export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const method = event.node.req.method;

  if (method === "PATCH") {
    const body = await readBody(event);
    const id = parseInt(event.context.params!.id);

    const response = await $fetch(
      `${config.public.baseApiUrl}/cart-items/${id}/`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
});
