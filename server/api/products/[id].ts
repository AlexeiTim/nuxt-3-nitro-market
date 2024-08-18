import { defineError } from "~/server/utils/defineError";
import { Product } from "~/types/product";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id);
  const axios = createAxiosInstance(event);

  try {
    const res = await axios<Product>(`/products/${id}`);
    return res.data;
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
