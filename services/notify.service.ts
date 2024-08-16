export const notifyService = {
  error(message: string) {
    ElNotification({
      type: "error",
      message,
    });
  },
  warning(message: string) {
    ElNotification({
      type: "warning",
      message,
    });
  },
  success(message: string) {
    ElNotification({
      type: "success",
      message,
    });
  },
};
