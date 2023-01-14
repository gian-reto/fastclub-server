export const isFulfilled = <T>(
  item: PromiseSettledResult<T>
): item is PromiseFulfilledResult<T> => {
  return item.status === "fulfilled";
};

export const isNotNull = <T>(
  item: PromiseFulfilledResult<T | null>
): item is PromiseFulfilledResult<T> => {
  return item.value !== null;
};
