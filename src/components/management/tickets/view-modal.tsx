/* eslint-disable @typescript-eslint/no-explicit-any */


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
import type { Ticket } from "@/types/ticket";

interface TicketViewModalProps {
  ticket: Ticket;
}

const TicketViewModal = ({ ticket }: TicketViewModalProps) => {
  const [open, setOpen] = useState(false);

  const statusVariant =
    ticket.status === "CLOSED"
      ? "success"
      : "warning";

  const date = new Date(ticket.createdAt).toLocaleDateString();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border">
          <div className="h-1.5 w-full bg-linear-to-r from-primary via-emerald-400 to-sky-400" />

          <div className="px-8 py-7 space-y-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-xl font-semibold font-crimson">
                Ticket Details
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                #{ticket.id.slice(-6).toUpperCase()} • {date}
              </p>
            </DialogHeader>

            <div className="space-y-3 text-sm">
              <InfoRow label="User Name" value={ticket.userName} />
              <InfoRow label="Email" value={ticket.userEmail} />
              <InfoRow label="Phone" value={ticket.userPhone} />
              <InfoRow label="Type" value={ticket.type.replace("_", " ")} />
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <p className="text-sm font-medium">Message</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ticket.message}
                </p>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                <p className="text-sm font-medium">Status</p>
                <Badge variant={statusVariant as any} className="px-3 py-1">
                  {ticket.status}
                </Badge>
              </div>

              {ticket.reply && (
                <div className="mt-6 pt-6 border-t space-y-3">
                  <p className="text-sm font-semibold">Support Reply</p>
                  <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                    <p className="text-sm font-medium">Reply Message</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ticket.reply.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TicketViewModal;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
    <p className="text-sm font-medium">{label}</p>
    <p className="text-sm text-muted-foreground">{value}</p>
  </div>
);

