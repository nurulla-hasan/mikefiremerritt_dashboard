"use client";

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
import { Textarea } from "@/components/ui/textarea";

const AddGymModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">+ Add Gym</Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 shadow-2xl">
          <div className="w-full h-40 md:h-56 bg-muted">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
              alt="Add Gym"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-8 py-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold font-crimson">
                Add Gym
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Gym Name</p>
                <Input placeholder="Enter gym name" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Location</p>
                <Input placeholder="Enter location" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Facilities</p>
                <Textarea placeholder="List facilities, comma separated" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="min-w-40 rounded-full">Save</Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddGymModal;

