import { Brand } from "~/types/brand";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);

  const response = await axios<Brand[]>(`/brands`);
  return response.data;
});
