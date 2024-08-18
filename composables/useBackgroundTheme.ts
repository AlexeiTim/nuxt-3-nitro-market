import { useDark } from "@vueuse/core";

export function useBackgroundTheme() {
  const isDark = useDark();
  const backgroundColor = useState("backgroundColor", () => "#ffffff");

  onMounted(() => {
    backgroundColor.value = isDark.value ? "#222222" : "white";
  });

  watch(isDark, () => {
    if (isDark.value) backgroundColor.value = "#222222";
    else backgroundColor.value = "white";
  });

  return {
    backgroundColor,
  };
}
