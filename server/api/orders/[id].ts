export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const id = +event.context.params!.id;

  const res = await axios(`/orders/${id}/`, {
    method: "DELETE",
  });

  return res.data;
});
