import { messageSchema } from "@/lib/schemas/messageSchema";
import { z } from "zod";

export const outboxRequestSchema = z.object({
  thisRequestEpoch: z.number().nonnegative(),
  messages: z.array(messageSchema),
});
