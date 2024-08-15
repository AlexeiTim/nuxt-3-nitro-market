import { TableData } from "~/types/api";
import { Product } from "~/types/product";
const config = useRuntimeConfig();

export default defineEventHandler(async () => {
  const data = await $fetch<TableData<Product>>(
    `${config.public.baseApiUrl}/products`
  );
  return data;
});
