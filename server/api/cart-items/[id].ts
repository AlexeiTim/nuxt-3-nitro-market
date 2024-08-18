export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const axios = createAxiosInstance(event);

  if (method === "PATCH") {
    const body = await readBody(event);
    const id = parseInt(event.context.params!.id);

    const response = await axios(`/cart-items/${id}/`, {
      method: "PATCH",
      data: body,
    });
    return response.data;
  }
});
