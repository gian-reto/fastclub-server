import { ZodIssue } from "zod";
import { withJsonHeader } from "@/util/fetch";

export const ErrorResponse = {
  405: new Response(
    JSON.stringify({
      success: false,
      issues: [
        {
          message: "Method not allowed",
        },
      ],
    }),
    withJsonHeader({ status: 404 })
  ),
  400: (issues: ZodIssue[]) =>
    new Response(
      JSON.stringify({
        success: false,
        issues: issues,
      }),
      withJsonHeader({
        status: 400,
      })
    ),
};
