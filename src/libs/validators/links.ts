import { z } from "zod";

export const LinkValidator = z.object({
  url: z
    .string()
    .includes(`.` || "http", {
      message: "Url must begin with http and include dot.",
    })
    .min(6, { message: "String must have at least 6 characters" }),
});

export type LinkRequest = z.infer<typeof LinkValidator>;
