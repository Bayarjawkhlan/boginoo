import { db } from "@/libs/db";
import { z } from "zod";
import { nanoid } from "nanoid";
import { LinkValidator } from "@/libs/validators/links";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { url: orignalLink } = LinkValidator.parse(body);

    let shortLink = nanoid(10);

    const link = await db.link.create({
      data: {
        shortLink,
        orignalLink,
      },
    });

    return NextResponse.json(link);
  } catch (error: any) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Internal Error", { status: 500 });
  }
}
