export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const axios = createAxiosInstance(event);

  try {
    const res = await axios({
      url: "/reviews",
      params: query,
    });
    return res.data;
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "ERROR GET REVIEW",
    });
  }
});
