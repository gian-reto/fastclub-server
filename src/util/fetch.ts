export const withJsonHeader = (init: ResponseInit) => ({
  ...init,
  headers: {
    ...init.headers,
    "Content-Type": "application/json",
  },
});
