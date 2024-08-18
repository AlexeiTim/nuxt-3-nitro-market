import { defineError } from "~/server/utils/defineError";
import { Brand } from "~/types/brand";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);

  try {
    const response = await axios<Brand[]>(`/brands`);
    return response.data;
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
