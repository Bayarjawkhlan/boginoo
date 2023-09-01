import { FC, Fragment } from "react";
import { toast } from "@/hooks/use-toast";
import { useAlertModal } from "@/hooks/useAlertModal";
import { useOrigin } from "@/hooks/useOrigin";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import AlertModal from "@/components/AlertModal";

import { Copy, MoreHorizontal, Trash } from "lucide-react";

import { LinkColumn } from "./Column";

interface CellActionProps {
  data: LinkColumn;
}

export const CellAction: FC<CellActionProps> = ({ data }) => {
  const { onOpen } = useAlertModal();
  const origin = useOrigin();

  const onCopy = () => {
    navigator.clipboard.writeText(`${origin}/${data.shortLink}`);
    toast({
      description: "Short link copied to the clipboard.",
    });
  };

  const onDelete = () => {
    onOpen();
  };

  return (
    <Fragment>
      <AlertModal linkId={data.id} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
};
