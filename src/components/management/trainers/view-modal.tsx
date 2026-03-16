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
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ITrainer } from "@/types/trainer";
import { formatDate } from "@/lib/utils";

interface TrainerViewModalProps {
  trainer: ITrainer;
}

const TrainerViewModal = ({ trainer }: TrainerViewModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-md p-0 overflow-hidden border shadow-2xl">
          <div className="bg-primary/20 px-6 pb-8 pt-8 flex flex-col items-center shrink-0">
            <div className="h-28 w-28 rounded-full border-[6px] border-background shadow-lg overflow-hidden bg-background">
              <img
                src={trainer.image || "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400"}
                alt={trainer.fullName}
                className="h-full w-full object-cover"
              />
            </div>

            <DialogHeader className="mt-4 text-center">
              <DialogTitle className="text-xl font-semibold font-crimson">
                {trainer.fullName}
              </DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="max-h-[60vh]">
            <div className="px-8 py-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Status">
                  <Badge 
                  className="text-[10px]"
                    variant={
                      trainer.status === "ACTIVE" 
                        ? "accepted" 
                        : trainer.status === "BLOCKED" 
                        ? "rejected" 
                        : "warning"
                    }
                  >
                    {trainer.status}
                  </Badge>
                </InfoRow>
                <InfoRow label="Experience">{trainer.experienceYears} Years</InfoRow>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Joined Date">
                  {trainer.createdAt ? formatDate(trainer.createdAt) : "N/A"}
                </InfoRow>
                <InfoRow label="Profile Views">{trainer.viewCount}</InfoRow>
              </div>

              <InfoRow label="Email">{trainer.email}</InfoRow>
              <InfoRow label="Phone">{trainer.phoneNumber}</InfoRow>
              <InfoRow label="Address">{trainer.address || "N/A"}</InfoRow>
              
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {trainer.specialty?.map((s) => (
                    <Badge key={s.id} variant="secondary" className="text-[10px]">
                      {s.specialtyName}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Service Types</p>
                <div className="flex flex-wrap gap-1">
                  {trainer.serviceTypes?.map((s) => (
                    <Badge key={s.id} variant="secondary" className="text-[10px]">
                      {s.serviceName}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground border-b pb-1">
                  Certifications
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {trainer.certifications?.map((cert, index) => (
                    <a 
                      key={index}
                      href={cert} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline truncate"
                    >
                      View Certificate {index + 1}
                    </a>
                  ))}
                  {(!trainer.certifications || trainer.certifications.length === 0) && (
                    <p className="text-xs text-muted-foreground italic">No certifications uploaded</p>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
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
    <div className="text-sm text-foreground">{children}</div>
  </div>
);

