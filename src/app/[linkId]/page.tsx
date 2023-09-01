import { db } from "@/libs/db";
import { redirect } from "next/navigation";

const LinkPage = async ({
  params,
}: {
  params: {
    linkId: string;
  };
}) => {
  if (!params.linkId || params.linkId.length === 0) {
    return new Response("Missing link id", { status: 409 });
  }

  const link = await db.link.findFirst({
    where: {
      shortLink: params.linkId,
    },
  });

  if (!link) {
    redirect("/");
  }

  redirect(link.orignalLink);

  return <></>;
};

export default LinkPage;
