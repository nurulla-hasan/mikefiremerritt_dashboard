
"use client";

import { useState } from "react";
import { Reply } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Ticket } from "@/types/ticket";
import { useReplyToSupportTicketMutation } from "@/redux/feature/support/supportApis";
import { toast } from "sonner";

interface TicketResponseModalProps {
  ticket: Ticket;
}

const TicketResponseModal = ({ ticket }: TicketResponseModalProps) => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [replyToTicket, { isLoading }] = useReplyToSupportTicketMutation();

  const handleSendResponse = async () => {
    if (!response.trim()) {
      toast.error("Please enter a response message");
      return;
    }

    try {
      await replyToTicket({
        id: ticket.id,
        data: { message: response }
      }).unwrap();
      
      toast.success("Response sent successfully");
      setOpen(false);
      setResponse("");
    } catch (error) {
      toast.error("Failed to send response");
      console.error("Error sending response:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Reply />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-md p-0 overflow-hidden border shadow-2xl">
          <div className="h-1.5 w-full bg-linear-to-r from-primary via-emerald-400 to-sky-400" />

          <div className="px-8 py-7 space-y-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-xl font-semibold font-crimson">
                Respond to Ticket
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                #{ticket.id.slice(-6).toUpperCase()} • {ticket.userName}
              </p>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="response" className="text-sm font-medium">
                  Your Response
                </Label>
                <Textarea
                  id="response"
                  placeholder="Type your response here..."
                  className="min-h-37.5 resize-none"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)} 
                className="rounded-full"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSendResponse} 
                className="rounded-full px-8"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Response"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TicketResponseModal;
