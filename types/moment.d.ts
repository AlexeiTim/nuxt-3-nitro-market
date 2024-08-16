import moment from "moment";

declare module "#app" {
  interface NuxtApp {
    $moment: typeof moment;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $moment: typeof moment;
  }
}
