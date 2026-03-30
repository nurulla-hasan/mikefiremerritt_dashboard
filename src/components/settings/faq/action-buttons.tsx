

import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddFAQModal from "./add-faq-modal";
import type { TFaq } from "@/types/faq.types";
import { useDeleteFaqMutation } from "@/redux/feature/faqs/faqApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export const ActionButtons = ({ faq }: { faq: TFaq }) => {
  const [open, setOpen] = useState(false);
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const handleDelete = async () => {
    try {
      await deleteFaq(faq.id).unwrap();
      SuccessToast("FAQ deleted successfully");
      setOpen(false);
    } catch (error) {
      const err = error as TError;
      ErrorToast(err?.data?.message || "Failed to delete FAQ");
    }
  };

  return (
    <div className="flex items-center justify-end pr-4">
      <AddFAQModal
        mode="edit"
        faq={faq}
        actionTrigger={
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-primary"
          >
            <Edit />
          </Button>
        }
      />
      <ConfirmationModal
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        confirmText="Delete"
        loadingText="Deleting..."
      />
    </div>
  );
};
