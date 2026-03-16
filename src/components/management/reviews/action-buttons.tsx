"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useDeleteReviewMutation } from "@/redux/feature/reviews/reviewsApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";
import type { TReview } from "@/types/review";
import ReviewViewModal from "./view-modal";

interface ReviewActionButtonsProps {
  review: TReview;
}

export const ReviewActionButtons = ({ review }: ReviewActionButtonsProps) => {
  const [open, setOpen] = useState(false);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const handleDelete = async () => {
    try {
      await deleteReview(review.id).unwrap();
      SuccessToast("Review deleted successfully");
      setOpen(false);
    } catch (error) {
      const err = error as TError;
      ErrorToast(err?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <ReviewViewModal review={review} />
      <ConfirmationModal
        title="Delete Review"
        description="Are you sure you want to delete this review? This action cannot be undone."
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        confirmText="Delete"
        loadingText="Deleting..."
        trigger={
          <Button variant="ghost" size="icon-sm" className="text-destructive">
            <Trash2 />
          </Button>
        }
      />
    </div>
  );
};
