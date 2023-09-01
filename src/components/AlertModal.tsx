"use client";

import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useAlertModal } from "@/hooks/useAlertModal";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { Button } from "./ui/Button";
import { useLinks } from "@/hooks/useLinks";

interface AlertModalProps {
  linkId: string;
}

const AlertModal: FC<AlertModalProps> = ({ linkId }) => {
  const { isOpen, onClose, onOpen } = useAlertModal();
  const { removeItem } = useLinks();

  const { isLoading, mutate } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/links/${linkId}`);
    },

    onSuccess: () => {
      onClose();
      removeItem(linkId);
    },

    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Coudn't delete link,please try again later",
      });
    },
  });

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => {
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure</AlertDialogTitle>
          <AlertDialogDescription>
            This action can not be undone
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <Button disabled={isLoading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={() => mutate()}
          >
            Delete
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
