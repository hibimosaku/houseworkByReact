//【課題】anyの対応方法が？
export function sort<T extends { [id: string]: any }, U extends keyof T>(
  // function sort<T extends { id: string }, U extends keyof T>(
  ary: Array<T>,
  key: U,
  order: "asending" | "descending"
): Array<T> {
  if (order === "asending") {
    return ary.sort((a: T, b: T) => {
      return a[key] - b[key];
    });
  } else {
    return ary.sort((a: T, b: T) => {
      return b[key] - a[key];
    });
  }
}
