export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = +event.context.params!.id;

  const response = await $fetch(`${config.public.baseApiUrl}/orders/${id}/`, {
    method: "DELETE",
  });

  return response;
});
