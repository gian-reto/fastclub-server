import { userSchema } from "@/lib/schemas/userSchema";
import { z } from "zod";

export const inboxRequestSchema = z.object({
  thisRequestEpoch: z.number().nonnegative(),
  lastRequestEpoch: z.number().nonnegative(),
  recipient: userSchema,
});
