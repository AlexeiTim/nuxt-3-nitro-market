import { defineError } from "~/server/utils/defineError";

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
    const error = defineError(e);
    throw createError(error);
  }
});
