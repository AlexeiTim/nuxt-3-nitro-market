import { defineError } from "~/server/utils/defineError";

export default defineEventHandler(async (event) => {
  try {
    deleteCookie(event, "authToken");
    return { result: "success" };
  } catch (e) {
    const error = defineError(e);
    throw createError(error);
  }
});
