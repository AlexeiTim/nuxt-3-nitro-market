import { Product } from "~/types/product";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id);
  const config = useRuntimeConfig();

  const product = await $fetch<Product>(
    `${config.public.baseApiUrl}/products/${id}`
  );
  return product;
});
