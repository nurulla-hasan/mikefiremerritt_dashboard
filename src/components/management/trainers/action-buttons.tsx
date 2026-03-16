
/* eslint-disable @typescript-eslint/no-explicit-any */


import TrainerViewModal from "./view-modal";
import type { ITrainer } from "@/types/trainer";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateTrainerProfileStatusMutation } from "@/redux/feature/trainer/trainerApis";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/lib/utils";

interface ActionButtonsProps {
  trainer: ITrainer;
}

export const ActionButtons = ({ trainer }: ActionButtonsProps) => {
  const [updateStatus, { isLoading }] = useUpdateTrainerProfileStatusMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleStatus = async () => {
    try {
      await updateStatus({ id: trainer.userId }).unwrap();
      setIsModalOpen(false);
      SuccessToast(`Trainer profile status updated to ${trainer.isProfileComplete === true ? "Incomplete" : "Complete"}`)
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to update trainer profile status");
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 pr-4">
      <TrainerViewModal trainer={trainer} />
      <ConfirmationModal
        title={trainer.isProfileComplete === true ? "Incomplete Trainer Profile" : "Complete Trainer Profile"}
        description={`Are you sure you want to ${trainer.isProfileComplete === true ? "incomplete" : "complete"
          } this trainer's profile?`}
        confirmText={trainer.isProfileComplete === true ? "Incomplete" : "Complete"}
        isLoading={isLoading}
        onConfirm={handleToggleStatus}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        loadingText={trainer.isProfileComplete === true ? "Incompleting..." : "Completing..."}
        trigger={
          <Button
            variant="ghost"
            size="icon-sm"
            className={
              trainer.isProfileComplete === true
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
