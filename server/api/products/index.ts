export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const axios = createAxiosInstance(event);

  const res = await axios.get("/products", {
    params: query,
  });
  return res.data;
});
