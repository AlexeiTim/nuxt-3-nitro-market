export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const brands = await $fetch(`${config.public.baseApiUrl}/brands`);
  return brands;
});
