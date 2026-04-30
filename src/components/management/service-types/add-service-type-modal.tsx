/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateServiceTypeMutation, useUpdateServiceTypeMutation } from "@/redux/feature/service-types/serviceTypesApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { ServiceType } from "./service-types-columns";

interface AddServiceTypeModalProps {
  serviceType?: ServiceType;
  trigger?: ReactNode;
}

const AddServiceTypeModal = ({ serviceType, trigger }: AddServiceTypeModalProps) => {
  const [open, setOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");

  const [createServiceType, { isLoading: isCreating }] = useCreateServiceTypeMutation();
  const [updateServiceType, { isLoading: isUpdating }] = useUpdateServiceTypeMutation();

  useEffect(() => {
    // Schedule state update to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      if (serviceType) {
        setServiceName(serviceType.serviceName);
      } else {
        setServiceName("");
      }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [serviceType, open]);

  const handleSubmit = async () => {
    if (!serviceName.trim()) {
      ErrorToast("Service name is required");
      return;
    }

    try {
      if (serviceType) {
        await updateServiceType({ id: serviceType.id, data: { serviceName } }).unwrap();
        SuccessToast("Service type updated successfully");
      } else {
        await createServiceType({ serviceName }).unwrap();
        SuccessToast("Service type added successfully");
      }
      setOpen(false);
      setServiceName("");
    } catch (error: any) {
      ErrorToast(error?.data?.message || `Failed to ${serviceType ? "update" : "add"} service type`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add Service Type</Button>}
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-md p-6 overflow-hidden border">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold font-crimson text-center">
              {serviceType ? "Update Service Type" : "Add New Service Type"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Service Name</p>
              <Input 
                placeholder="e.g. Personal Training, Online Coaching" 
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>

            <div className="flex justify-center pt-2">
              <Button 
                className="w-full" 
                loading={isCreating || isUpdating}
                loadingText={serviceType ? "Updating..." : "Saving..."}
                onClick={handleSubmit}
                disabled={isCreating || isUpdating}
              >
                {serviceType ? "Update Service Type" : "Save Service Type"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddServiceTypeModal;
