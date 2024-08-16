export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const axios = createAxiosInstance(event);

  try {
    const res = await axios.post("/reviews/", body);
    return res.data;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "ERROR ADD COMMENT",
    });
  }
});
