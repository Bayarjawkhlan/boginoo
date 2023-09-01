"use client";

import { useLinks } from "@/hooks/useLinks";
import { FC } from "react";

import { Label } from "./ui/Label";

import { Description } from "@radix-ui/react-toast";
import { DataTable } from "./DataTable";
import { columns } from "./Column";

interface LinksProps {}

const Links: FC<LinksProps> = () => {
  const { links } = useLinks();

  return (
    <div className="custom-width flex flex-col gap-3">
      <header className="">
        <Label className="text-xl">Your Links</Label>
        <Description className="text-sm text-muted-foreground">
          Click on row to copy url
        </Description>
      </header>
      {links.length === 0 ? (
        <div className="flex w-full grow items-center justify-center rounded-xl border bg-gray-50 dark:bg-gray-800">
          Your storage is empty
        </div>
      ) : (
        <div className="">
          <DataTable columns={columns} data={links} />
        </div>
      )}
    </div>
  );
};

export default Links;
