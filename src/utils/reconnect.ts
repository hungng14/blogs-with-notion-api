export const reconnect = async (
  fn: () => Promise<any>,
  retry: number = 3
): Promise<any> => {
  let count = 1;
  try {
    const data = await fn();
    return data;
  } catch (error: any) {
    if (count <= retry) {
      count += 1;
      return reconnect(fn, retry - 1);
    }
    throw new Error(error);
  }
};
