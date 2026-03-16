"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { TReview } from "@/types/review";

interface ReviewViewModalProps {
  review: TReview;
}

const ReviewViewModal = ({ review }: ReviewViewModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-xl p-0 overflow-hidden border shadow-2xl">
          <div className="h-1.5 w-full bg-linear-to-r from-primary via-amber-400 to-rose-400" />

          <div className="px-8 py-7 space-y-5">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-xl font-semibold font-crimson">
                Review Details
              </DialogTitle>
              <p className="text-xs text-muted-foreground">{review.user.email}</p>
            </DialogHeader>

            <div className="space-y-3 text-sm">
              <InfoRow label="User Name" value={review.user.fullName} />
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <p className="text-sm font-medium">Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg text-amber-400 leading-none">
                    {"★".repeat(review.rating)}
                    <span className="text-muted-foreground/40">
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </p>
                  <span className="text-xs text-muted-foreground">({review.rating}/5)</span>
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <p className="text-sm font-medium">Review</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
              <InfoRow label="Posted On" value={new Date(review.createdAt).toLocaleDateString()} />
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ReviewViewModal;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
    <p className="text-sm font-medium">{label}</p>
    <p className="text-sm text-muted-foreground">{value}</p>
  </div>
);

