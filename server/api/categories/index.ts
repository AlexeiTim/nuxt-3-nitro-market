export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const res = await axios(`/categories`);
  return res.data;
});
