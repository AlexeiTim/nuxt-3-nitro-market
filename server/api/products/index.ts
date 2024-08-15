import { TableData } from "~/types/api";
import { Product } from "~/types/product";
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const data = await $fetch<TableData<Product>>(
    `${config.public.baseApiUrl}/products`,
    {
      query,
    }
  );
  return data;
});
