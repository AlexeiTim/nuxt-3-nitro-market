export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);

  try {
    deleteCookie(event, "authToken");
    return { result: "success" };
  } catch (e) {
    throw createError({
      statusMessage: "Bad message",
    });
  }
});
