/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteSpecialtyMutation } from "@/redux/feature/specialties/specialtyApis";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { Specialty } from "./specialties-columns";
import AddSpecialtyModal from "./add-specialty-modal";

const SpecialtyAction = ({ specialty }: { specialty: Specialty }) => {
  const [deleteSpecialty, { isLoading: isDeleting }] = useDeleteSpecialtyMutation();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteSpecialty(specialty.id).unwrap();
      SuccessToast("Specialty deleted successfully");
      setOpenDelete(false);
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to delete specialty");
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <AddSpecialtyModal 
        specialty={specialty} 
        trigger={
          <Button variant="ghost" size="icon-sm">
            <Edit className="size-4" />
          </Button>
        } 
      />
      
      <ConfirmationModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Delete Specialty"
        description={`Are you sure you want to delete "${specialty.specialtyName}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        trigger={
          <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
            <Trash2 className="size-4" />
          </Button>
        }
      />
    </div>
  );
};

export default SpecialtyAction;
