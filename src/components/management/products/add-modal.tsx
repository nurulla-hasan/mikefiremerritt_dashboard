
import { useState } from "react";

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

const AddProgramModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">+ Add Program</Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border shadow-2xl">
          <div className="w-full h-40 md:h-56 bg-muted">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
              alt="Add Program"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-8 py-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold font-crimson">
                Add New Program
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Program Name</p>
                <Input placeholder="Enter program name" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Trainer Name</p>
                <Input placeholder="Enter trainer name" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Price</p>
                <Input placeholder="Enter price" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Specialty</p>
                <Input placeholder="Enter specialty" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="min-w-40 rounded-full">Save Program</Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddProgramModal;
