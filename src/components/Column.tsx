"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";

export type LinkColumn = {
  id: string;
  shortLink: string;
  orignalLink: string;
};

export const columns: ColumnDef<LinkColumn>[] = [
  {
    accessorKey: "shortLink",
    header: "Short Link",
  },
  {
    accessorKey: "orignalLink",
    header: "Orignal Link",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
