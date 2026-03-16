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
import { Button } from "@/components/ui/button";
import type { IUser } from "@/types/user";

interface UserViewModalProps {
  user: IUser;
}

const UserViewModal = ({ user }: UserViewModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-md p-0 overflow-hidden border shadow-2xl">
          <div className="bg-primary/20 px-6 pb-8 pt-8 flex flex-col items-center">
            <div className="h-28 w-28 rounded-full border-[6px] border-background shadow-lg overflow-hidden bg-background">
              <img
                src={user.image || "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400"}
                alt={user.fullName}
                className="h-full w-full object-cover"
              />
            </div>

            <DialogHeader className="mt-4 text-center">
              <DialogTitle className="text-xl font-semibold font-crimson">
                {user.fullName}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="px-8 py-6 space-y-4 text-sm">
            <InfoRow label="Status">
              <span className="text-emerald-600 font-medium">
                {user.status}
              </span>
            </InfoRow>
            <InfoRow label="Email">{user.email}</InfoRow>
            <InfoRow label="Contact No">{user.phoneNumber || "N/A"}</InfoRow>
            <InfoRow label="Fitness Goals">{user.fitnessGoals?.join(", ") || "N/A"}</InfoRow>
            <InfoRow label="Address">{user.address || "N/A"}</InfoRow>
          </div>

          <div className="flex items-center justify-center gap-4 px-8 pb-6 pt-2">
            <Button className="min-w-30 rounded-full text-white hover:bg-primary/90">
              Update Status
            </Button>
            <Button
              variant="destructive"
              className="min-w-30 rounded-full bg-red-500 hover:bg-red-600"
            >
              Delete User
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default UserViewModal;

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
