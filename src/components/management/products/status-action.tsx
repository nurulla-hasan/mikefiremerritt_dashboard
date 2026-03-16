/* eslint-disable @typescript-eslint/no-explicit-any */


import { Ban, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IProduct } from "@/types/product";
import { useUpdateProductStatusMutation } from "@/redux/feature/products/productsApis";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/lib/utils";

const StatusAction = ({ product }: { product: IProduct }) => {
  const [updateStatus, { isLoading }] = useUpdateProductStatusMutation();
  const [open, setOpen] = useState(false);

  const handleToggle = async () => {
    try {
      await updateStatus({ id: product.id }).unwrap();
      SuccessToast(
        `Product ${product.isActive ? "Blocked" : "Activated"} Successfully`
      );
      setOpen(false);
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to update status");
    }
  };

  return (
    <ConfirmationModal
      open={open}
      onOpenChange={setOpen}
      title={product.isActive ? "Block Product" : "Activate Product"}
      description={`Are you sure you want to ${
        product.isActive ? "block" : "activate"
      } this product?`}
      confirmText={product.isActive ? "Block" : "Activate"}
      isLoading={isLoading}
      loadingText={product.isActive ? "Blocking..." : "Activating..."}
      onConfirm={handleToggle}
      trigger={
        <Button
          variant="ghost"
          size="icon-sm"
          className={
            product.isActive
              ? "text-red-500 hover:text-red-600"
              : "text-emerald-500 hover:text-emerald-600"
          }
        >
          {product.isActive ? (
            <Ban className="size-4" />
          ) : (
            <CheckCircle className="size-4" />
          )}
        </Button>
      }
    />
  );
};

export default StatusAction;
