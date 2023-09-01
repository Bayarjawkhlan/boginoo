import { db } from "@/libs/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      linkId: string;
    };
  },
) {
  try {
    if (!params.linkId || params.linkId.length === 0) {
      return new Response("Error", { status: 404 });
    }

    await db.link.deleteMany({
      where: {
        id: params.linkId,
      },
    });

    return new Response("OK");
  } catch (error: any) {
    return new Response("Internal Error", { status: 500 });
  }
}
