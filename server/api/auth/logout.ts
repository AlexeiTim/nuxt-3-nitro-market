export default defineEventHandler(async (event) => {
  try {
    deleteCookie(event, "authToken");
    return { result: "success" };
  } catch (e) {
    throw createError({
      statusMessage: "Bad message",
    });
  }
});
