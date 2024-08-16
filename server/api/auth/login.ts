import { createAxiosInstance } from "~/server/utils/axios";

export default defineEventHandler(async (event) => {
  const axios = createAxiosInstance(event);
  const body = await readBody(event);

  try {
    const response = await axios.post("/token/login/", body);

    const token = response.data.auth_token;
    if (token)
      setCookie(event, "authToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    return response.data;
  } catch (error) {
    createError({ data: error });
  }
});
