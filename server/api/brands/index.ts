import { Brand } from "~/types/brand";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const brands = await $fetch<Brand[]>(`${config.public.baseApiUrl}/brands`);
  return brands;
});
