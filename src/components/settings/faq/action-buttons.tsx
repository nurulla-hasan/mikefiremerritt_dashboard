"use client";

import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddFAQModal from "./add-faq-modal";
import type { TFaq } from "@/types/faq.types";
import { useDeleteFaqMutation } from "@/redux/feature/faq/faqApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";

export const ActionButtons = ({ faq }: { faq: TFaq }) => {
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const handleDelete = async () => {
    try {
      await deleteFaq(faq.id).unwrap();
      SuccessToast("FAQ deleted successfully");
    } catch (error) {
      const err = error as TError;
      ErrorToast(err?.data?.message || "Failed to delete FAQ");
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 pr-4">
      <AddFAQModal mode="edit" faq={faq}>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary"
        >
          <Edit />
        </Button>
      </AddFAQModal>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive"
        onClick={handleDelete}
        loading={isDeleting}
        loadingText="Deleting..."
      >
        <Trash2 />
      </Button>
    </div>
  );
};
