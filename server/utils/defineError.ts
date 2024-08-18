export const defineError = (
  e: any
): { statusCode: number; statusMessage: string } => {
  const statusCode = e.response?.status || 500;
  const statusMessage = e.response?.data || e.message || "Server Error";
  return {
    statusCode,
    statusMessage,
  };
};
