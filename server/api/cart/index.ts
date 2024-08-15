export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const cart = await $fetch(`${config.public.baseApiUrl}/cart`);
  return [];
});
