import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const id = event.context.params!.id;
  const method = event.node.req.method;

  try {
    if (method === "PATCH") {
      const body = await readBody(event);
      const res = await axios(`/wallets/${id}/`, {
        method: "PATCH",
        data: body,
      });
      return res.data;
    } else if (method === "GET") {
      const res = await axios(`/wallets/${id}/`);
      return res.data;
    }
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
