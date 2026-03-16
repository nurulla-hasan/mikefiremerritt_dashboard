/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserViewModal from "./view-modal";
import type { IUser } from "@/types/user";
import { useUpdateUserStatusMutation } from "@/redux/feature/user/userApis";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/lib/utils";

interface ActionButtonsProps {
  user: IUser;
}

export const ActionButtons = ({ user }: ActionButtonsProps) => {
  const [updateStatus, { isLoading }] = useUpdateUserStatusMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleStatus = async () => {
    try {
      await updateStatus({ id: user.id }).unwrap();
      setIsModalOpen(false);
      SuccessToast(`User status updated to ${user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE"}`)
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to update user status");
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 pr-4">
      <UserViewModal user={user} />
      <ConfirmationModal
        title={user.status === "ACTIVE" ? "Block User" : "Unblock User"}
        description={`Are you sure you want to ${user.status === "ACTIVE" ? "block" : "unblock"
          } this user?`}
        confirmText={user.status === "ACTIVE" ? "Block" : "Unblock"}
        isLoading={isLoading}
        onConfirm={handleToggleStatus}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        trigger={
          <Button
            variant="ghost"
            size="icon-sm"
            className={
              user.status === "ACTIVE"
                ? "text-amber-500 hover:text-amber-600"
                : "text-emerald-500 hover:text-emerald-600"
            }
          >
            <Ban className="h-4 w-4" />
          </Button>
        }
      />
    </div>
  );
};
