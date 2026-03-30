

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useDeleteAdminMutation } from "@/redux/feature/admins/adminApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";
import type { TAdmin } from "@/types/admin";

interface AdminActionButtonsProps {
  admin: TAdmin;
}

export const AdminActionButtons = ({ admin }: AdminActionButtonsProps) => {
  const [open, setOpen] = useState(false);
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  const handleDelete = async () => {
    try {
      await deleteAdmin(admin.id).unwrap();
      SuccessToast("Admin deleted successfully");
      setOpen(false);
    } catch (error) {
      const err = error as TError;
      ErrorToast(err?.data?.message || "Failed to delete admin");
    }
  };

  return (
    <div className="flex items-center justify-end">
      <ConfirmationModal
        title="Delete Admin"
        description="Are you sure you want to delete this admin? This action cannot be undone."
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        confirmText="Delete"
        loadingText="Deleting..."
        trigger={
          <Button variant="ghost" size="icon-sm" className="text-red-500 hover:text-red-600">
            <Trash2 />
          </Button>
        }
      />
    </div>
  );
};
