

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "./spinner";
import type { ReactNode } from "react";
import { Button } from "./button";
import { Trash2 } from "lucide-react";

interface ConfirmationModalProps {
  title?: string;
  description?: string;
  confirmText?: string;
  loadingText?: string;
  cancelText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  trigger?: ReactNode;
  children?: ReactNode;
}

export function ConfirmationModal({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  loadingText = "Deleting...",
  cancelText = "Cancel",
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  trigger,
  children,
}: ConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
     {trigger !== null && (
        <AlertDialogTrigger asChild>
          {trigger || (
            <Button
              variant="ghost"
              size="icon-sm"
            >
              <Trash2 />
            </Button>
          )}
        </AlertDialogTrigger>
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {children}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e: { preventDefault: () => void; }) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner />
                {loadingText}
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}