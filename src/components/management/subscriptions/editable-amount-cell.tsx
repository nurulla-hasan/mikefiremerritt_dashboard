/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useOverrideSubscriptionPriceMutation } from "@/redux/feature/pricing-rules/pricingRuleApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { Edit, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TSubscription } from "@/types/subscription";

interface EditableAmountCellProps {
  subscription: TSubscription & {
    subscriptionAdminOverrides?: Array<{
      id: string;
      overridePrice: number;
      note: string;
    }>;
  };
}

export const EditableAmountCell = ({ subscription }: EditableAmountCellProps) => {
  const [open, setOpen] = useState(false);
  const [overridePrice, setOverridePrice] = useState("");
  const [note, setNote] = useState("");
  const [overrideSubscriptionPrice, { isLoading }] = useOverrideSubscriptionPriceMutation();

  // Check if there's an admin override price
  const adminOverride = subscription.subscriptionAdminOverrides?.[0];
  const originalPrice = subscription.subscriptionOffer.price;
  const displayPrice = adminOverride?.overridePrice ?? originalPrice;
  const hasOverride = !!adminOverride;

  const handleSave = async () => {
    if (!overridePrice || Number(overridePrice) <= 0) {
      ErrorToast("Please enter a valid price greater than 0");
      return;
    }

    try {
      await overrideSubscriptionPrice({
        id: subscription.id,
        data: {
          overridePrice: Number(overridePrice),
          note: note || "Price overridden by admin",
        },
      }).unwrap();
      SuccessToast("Price overridden successfully");
      setOpen(false);
      setOverridePrice("");
      setNote("");
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to override price");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className={`text-sm ${hasOverride ? "text-primary font-medium" : "text-muted-foreground"}`}>
            ${displayPrice}
          </span>
          {hasOverride && (
            <span className="text-xs text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Edit className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle>Override Price</DialogTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    This is a one-time applied coupon. The original price will be restored automatically next month.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <DialogDescription>
            Set a custom price for {subscription.trainerInfo.name}&apos;s subscription.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current-price">{hasOverride ? "Overridden Price" : "Current Price"}</Label>
            <Input id="current-price" value={`$${displayPrice}`} disabled />
            {hasOverride && (
              <p className="text-xs text-muted-foreground">
                Original price: ${originalPrice}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="override-price">New Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="override-price"
                type="number"
                value={overridePrice}
                onChange={(e) => setOverridePrice(e.target.value)}
                placeholder="25"
                className="pl-7"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Applying special discount..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
