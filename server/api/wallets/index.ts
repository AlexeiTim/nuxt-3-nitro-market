import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const method = event.node.req.method;

  try {
    if (method === "POST") {
      const res = await axios(`/wallets/`, {
        method: "POST",
      });
      return res.data;
    } else if (method === "GET") {
      const res = await axios("/wallets/");
      return res.data;
    }
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
