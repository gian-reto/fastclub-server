import { equals, map } from "remeda";

import { ErrorResponse } from "@/lib/constants/ErrorResponse";
import type { NextRequest } from "next/server";
import { b64Decode } from "@/util/b64";
import { inboxRequestSchema } from "@/lib/schemas/inboxRequestSchema";
import { messageSchema } from "@/lib/schemas/messageSchema";
import { redis } from "@/util/redis";
import { withJsonHeader } from "@/util/fetch";
import { z } from "zod";

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req: NextRequest) => {
  if (!equals(req.method, "POST")) return ErrorResponse[405];

  const request = await req
    .json()
    .catch(() => ({}))
    .then(inboxRequestSchema.safeParse);

  if (!request.success) return ErrorResponse[400](request.error.issues);

  const {
    recipient: { publicKey },
    thisRequestEpoch,
    lastRequestEpoch,
  } = request.data;

  const response = await redis
    .zrange(`user:${publicKey}:inbox`, lastRequestEpoch, thisRequestEpoch, {
      byScore: true,
    })
    .then((messages) => messages as string[])
    .then((messages) => messages.map((message) => b64Decode(message)))
    .then(map(JSON.parse))
    .catch(() => [])
    .then(z.array(messageSchema).safeParse);

  return new Response(
    JSON.stringify(response),
    withJsonHeader({
      status: 200,
    })
  );
};

export default handler;
