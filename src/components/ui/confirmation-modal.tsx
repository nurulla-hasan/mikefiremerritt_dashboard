"use client";

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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { Spinner } from "./spinner";

interface ConfirmationModalProps {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  trigger?: ReactNode;
  confirmButtonText?: string;
  confirmLoadingText?: string;
}

export function ConfirmationModal({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  trigger,
  confirmButtonText = "Confirm",
  confirmLoadingText = "Confirming...",
}: ConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger !== null && (
        <AlertDialogTrigger asChild>
          {trigger || (
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-destructive"
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

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner />
                {confirmLoadingText}
              </>
            ) : (
              confirmButtonText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}