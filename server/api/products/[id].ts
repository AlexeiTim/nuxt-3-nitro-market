import { Product } from "~/types/product";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id);
  const axios = createAxiosInstance(event);

  const res = await axios<Product>(`/products/${id}`);
  return res.data;
});
