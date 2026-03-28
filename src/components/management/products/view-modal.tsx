
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { IProduct } from "@/types/product";

interface ProductViewModalProps {
  data: IProduct;
}

const ProductViewModal = ({ data }: ProductViewModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Eye className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border shadow-2xl">
          <div className="w-full h-44 md:h-60 bg-muted">
            <img
              src={data.productImage || ""}
              alt={data.productName}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-8 py-6 space-y-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-semibold font-crimson">
                {data.productName}
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-[50vh]">
              <div className="space-y-4 pr-4">
                <div className="grid grid-cols-2 gap-4">
                  <InfoRow label="Trainer Name" value={data.trainer?.trainerName || "N/A"} />
                  <InfoRow label="Price" value={`$${data.price}`} />
                  <InfoRow label="Views" value={data.views?.toString() || "0"} />
                  <InfoRow label="Purchased" value={data.totalPurchased?.toString() || "0"} />
                  <InfoRow label="Duration" value={`${data.durationWeeks} Weeks`} />
                  <InfoRow label="Capacity" value={data.capacity?.toString() || "0"} />
                  <InfoRow label="Rating" value={`⭐ ${data.avgRating || 0} (${data.ratingCount || 0})`} />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</p>
                    <Badge variant={data.isActive ? "accepted" : "rejected"} className="rounded-full px-3 py-0.5">
                      {data.isActive ? "Active" : "Blocked"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</p>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {data.description || "No description available."}
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ProductViewModal;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

