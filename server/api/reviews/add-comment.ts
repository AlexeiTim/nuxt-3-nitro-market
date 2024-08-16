export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const axios = createAxiosInstance(event);

  try {
    console.log(body, "create comment");
    const res = await axios.post("/reviews/", body);
    console.log("response", res);
    return res.data;
  } catch (error) {
    // Логирование полной ошибки
    console.error("Ошибка при создании отзыва:", error);

    // Убедитесь, что error.response существует и имеет нужные данные
    const statusCode = error.response?.status || 500;
    const statusMessage =
      error.response?.data?.detail || "Ошибка при создании отзыва";

    throw createError({
      statusCode,
      statusMessage,
    });
  }
});
