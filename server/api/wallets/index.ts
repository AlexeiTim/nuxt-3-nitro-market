export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const method = event.node.req.method;

  if (method === "POST") {
    const res = await axios(`/wallets/`, {
      method: "POST",
    });
    return res.data;
  } else if (method === "GET") {
    const res = await axios("/wallets/");
    return res.data;
  }
});
