import { z } from "zod";

export const messageSchema = z.object({
  sender: z.object({
    publicKey: z.string(),
  }),
  recipient: z.object({
    publicKey: z.string(),
  }),
  content: z.string(),
});
