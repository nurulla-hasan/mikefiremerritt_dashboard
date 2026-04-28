import { useState } from "react";
import { Eye } from "lucide-react";

import { format } from "date-fns";
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
import { Badge } from "@/components/ui/badge";

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
        <DialogContent className="max-w-md p-0 overflow-hidden border">
          <div className="bg-primary/5 px-6 pb-6 pt-8 flex flex-col items-center">
            <div className="h-24 w-24 border-4 border-background shadow-md overflow-hidden bg-background">
              <img
                src={user.image || "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400"}
                alt={user.fullName}
                className="h-full w-full object-cover"
              />
            </div>

            <DialogHeader className="mt-4 text-center">
              <DialogTitle className="text-xl font-semibold text-center">
                {user.fullName}
              </DialogTitle>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">
                  {user.role}
                </Badge>
                <Badge 
                  variant={user.status === "ACTIVE" ? "accepted" : "rejected"}
                  className="text-[10px] uppercase tracking-wider font-bold"
                >
                  {user.status}
                </Badge>
              </div>
            </DialogHeader>
          </div>

          <div className="px-8 py-6 space-y-5 text-sm">
            {user.bio && (
              <InfoRow label="Bio">
                <p className="italic text-muted-foreground leading-relaxed">{user.bio}</p>
              </InfoRow>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <InfoRow label="Email">{user.email}</InfoRow>
              <InfoRow label="Phone Number">{user.phoneNumber || "N/A"}</InfoRow>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InfoRow label="Fitness Goals">
                {user.fitnessGoals && user.fitnessGoals.length > 0 
                  ? user.fitnessGoals.join(", ") 
                  : "N/A"}
              </InfoRow>
              <InfoRow label="Joined Date">
                {user.createdAt ? format(new Date(user.createdAt), "PPP") : "N/A"}
              </InfoRow>
            </div>

            <InfoRow label="Address">{user.address || "N/A"}</InfoRow>
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
