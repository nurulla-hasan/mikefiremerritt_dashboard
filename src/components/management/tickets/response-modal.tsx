
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

const TicketResponseModal = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const handleSendResponse = () => {
    // In a real app, this would call an API
    console.log("Sending response:", response);
    setOpen(false);
    setResponse("");
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
                TKT-0001 • Issue with subscription payment
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
                />
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button onClick={handleSendResponse} className="rounded-full px-8">
                Send Response
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TicketResponseModal;
