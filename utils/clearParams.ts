export function clearParams(params: object) {
  return Object.fromEntries(
    Object.entries(params).filter(
      (param) => typeof param[1] === "boolean" || !!param[1]
    )
  );
}
