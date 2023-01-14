import { createPipe, equals, filter, keys, prop, sumBy } from "remeda";
import { isFulfilled, isNotNull } from "@/util/promise";

import { ErrorResponse } from "@/lib/constants/ErrorResponse";
import type { NextRequest } from "next/server";
import { b64Encode } from "@/util/b64";
import { outboxRequestSchema } from "@/lib/schemas/outboxRequestSchema";
import { redis } from "@/util/redis";
import { withJsonHeader } from "@/util/fetch";

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req: NextRequest) => {
  if (!equals(req.method, "POST")) return ErrorResponse[405];

  const request = await req
    .json()
    .catch(() => ({}))
    .then(outboxRequestSchema.safeParse);

  if (!request.success) return ErrorResponse[400](request.error.issues);

  const { thisRequestEpoch, messages } = request.data;

  const count = await Promise.allSettled([
    ...messages.map((message) => {
      const encodedMessage = b64Encode(JSON.stringify(message));

      return redis.zadd(`user:${message.recipient.publicKey}:inbox`, {
        score: thisRequestEpoch,
        member: encodedMessage,
      });
    }),
  ]).then(
    createPipe(filter(isFulfilled), filter(isNotNull), sumBy(prop("value")))
  );

  return new Response(
    JSON.stringify({
      success: true,
      count,
    }),
    withJsonHeader({
      status: 200,
    })
  );
};

export default handler;
