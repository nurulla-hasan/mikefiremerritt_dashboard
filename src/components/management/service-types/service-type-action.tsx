/* eslint-disable @typescript-eslint/no-explicit-any */

import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteServiceTypeMutation } from "@/redux/feature/service-types/serviceTypesApis";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { ServiceType } from "./service-types-columns";
import AddServiceTypeModal from "./add-service-type-modal";

const ServiceTypeAction = ({ serviceType }: { serviceType: ServiceType }) => {
  const [deleteServiceType, { isLoading: isDeleting }] = useDeleteServiceTypeMutation();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteServiceType(serviceType.id).unwrap();
      SuccessToast("Service type deleted successfully");
      setOpenDelete(false);
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to delete service type");
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <AddServiceTypeModal 
        serviceType={serviceType} 
        trigger={
          <Button variant="ghost" size="icon-sm">
            <Edit className="size-4" />
          </Button>
        } 
      />
      
      <ConfirmationModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Delete Service Type"
        description={`Are you sure you want to delete "${serviceType.serviceName}"? This action cannot be undone.`}
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

export default ServiceTypeAction;
