import { fromByteArray, toByteArray } from "base64-js";

export const b64Encode = (string: string) => {
  const encodedBytes = new TextEncoder().encode(string);

  return fromByteArray(encodedBytes);
};

export const b64Decode = (string: string) => {
  const decodedBytes = toByteArray(string);

  return new TextDecoder().decode(decodedBytes);
};
