export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);

  try {
    const res = await axios.get("/users/me/");
    return res.data;
  } catch (e) {
    createError({
      statusMessage: "Bad request",
    });
  }
});
