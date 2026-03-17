/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useDeletePricingRuleMutation } from "@/redux/feature/pricing-rule/pricingRuleApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TPricingRule } from "@/types/pricing-rule";

interface PricingRuleActionButtonsProps {
  pricingRule: TPricingRule;
}

export const PricingRuleActionButtons = ({ pricingRule }: PricingRuleActionButtonsProps) => {
  const [open, setOpen] = useState(false);
  const [deletePricingRule, { isLoading: isDeleting }] = useDeletePricingRuleMutation();

  const handleDelete = async () => {
    try {
      await deletePricingRule(pricingRule.id).unwrap();
      SuccessToast("Pricing rule deleted successfully");
      setOpen(false);
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to delete pricing rule");
    }
  };

  return (
    <div className="flex items-center justify-end">
      <ConfirmationModal
        title="Delete Pricing Rule"
        description="Are you sure you want to delete this pricing rule? This action cannot be undone."
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        confirmText="Delete"
        loadingText="Deleting..."
        trigger={
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />
    </div>
  );
};
