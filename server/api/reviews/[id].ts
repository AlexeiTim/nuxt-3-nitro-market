export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const id = +event.context.params!.id;

  try {
    await axios.delete(`/reviews/${id}/`);
  } catch (e) {
    throw createError({
      status: 400,
      statusMessage: "ERROR DELETE COMMENT",
    });
  }
});
