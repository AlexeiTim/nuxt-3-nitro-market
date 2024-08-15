export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const categoris = await $fetch(`${config.public.baseApiUrl}/categories`);
  return categoris;
});
