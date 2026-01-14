;

import { useState } from "react";
import { Eye } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fakeTrainer = {
  name: "Jemi Black",
  status: "Complete",
  email: "mahmud@gmail.com",
  contactNo: "+91 9355 574544",
  views: "1544",
  totalReferral: "1544",
  designation: "Trainer",
  address: "68/ Joker Vila, Gotham City",
  specialties: "Weight Loss, Strength Training, Nutrition",
  certifications: ["NASM", "ACE", "NACM"],
  avatar:
    "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400",
};

const TrainerViewModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-md p-0 overflow-hidden border-0 shadow-2xl">
          <div className="bg-primary/20 px-6 pb-8 pt-8 flex flex-col items-center">
            <div className="h-28 w-28 rounded-full border-[6px] border-background shadow-lg overflow-hidden bg-background">
              <img
                src={fakeTrainer.avatar}
                alt={fakeTrainer.name}
                className="h-full w-full object-cover"
              />
            </div>

            <DialogHeader className="mt-4 text-center">
              <DialogTitle className="text-xl font-semibold font-crimson">
                {fakeTrainer.name}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="px-8 py-6 space-y-4 text-sm">
            <InfoRow label="Status">
              <span className="text-emerald-600 font-medium">
                {fakeTrainer.status}
              </span>
            </InfoRow>
            <InfoRow label="Email">{fakeTrainer.email}</InfoRow>
            <InfoRow label="Contact No">{fakeTrainer.contactNo}</InfoRow>
            <InfoRow label="Views">{fakeTrainer.views}</InfoRow>
            <InfoRow label="Total Referral">{fakeTrainer.totalReferral}</InfoRow>
            <InfoRow label="Designation">{fakeTrainer.designation}</InfoRow>
            <InfoRow label="Address">{fakeTrainer.address}</InfoRow>
            <InfoRow label="Specialties">{fakeTrainer.specialties}</InfoRow>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Certifications
              </p>
              <div className="flex flex-wrap gap-2">
                {fakeTrainer.certifications.map((c) => (
                  <Badge key={c} variant="success" className="rounded-full px-3">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TrainerViewModal;

const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-0.5">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="text-sm text-foreground">{children}</p>
  </div>
);

