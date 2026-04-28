

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
import { ScrollArea } from "@/components/ui/scroll-area";
import type { INewsfeed } from "@/types/newsfeed";
import { formatDate } from "@/lib/utils";

interface NewsfeedViewModalProps {
  data: INewsfeed;
}

const NewsfeedViewModal = ({ data }: NewsfeedViewModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Eye className="size-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none">
          <ScrollArea className="h-[80vh]">
            <div className="w-full h-64 md:h-80 bg-muted relative">
              {data.video ? (
                <video
                  src={data.video}
                  controls
                  className="h-full w-full object-cover"
                />
              ) : data.image ? (
                <img
                  src={data.image}
                  alt={data.user.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-muted text-muted-foreground italic">
                  No Media Available
                </div>
              )}
            </div>

            <div className="px-10 py-8 space-y-6">
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl font-semibold font-crimson">
                  Newsfeed Details
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <InfoRow label="Poster Name" value={data?.user?.fullName || "N/A"} />
                <InfoRow label="Account Type" value={data?.user?.role?.toLowerCase() || "N/A"} className="capitalize" />
                <div className="grid grid-cols-[160px_1fr] gap-4">
                  <p className="text-sm font-medium pt-1">Content</p>
                  <ScrollArea className="max-h-50 rounded-sm border p-2 bg-muted/20 shadow-inner">
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {data?.content || "No content provided"}
                    </p>
                  </ScrollArea>
                </div>
                <InfoRow label="Impressions" value={data?.impressionCount?.toString() || "0"} />
                <InfoRow label="Reach" value={data?.reachCount?.toString() || "0"} />
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Likes</p>
                    <p className="text-sm font-semibold">{data?.likeCount ?? 0}</p>
                  </div>
                  <div className="text-center border-x border-border">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Comments</p>
                    <p className="text-sm font-semibold">{data?.commentCount ?? 0}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Shares</p>
                    <p className="text-sm font-semibold">{data?.shareCount ?? 0}</p>
                  </div>
                </div>
                <InfoRow label="Date" value={data?.createdAt ? formatDate(data.createdAt) : "N/A"} />
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default NewsfeedViewModal;

const InfoRow = ({ label, value, className }: { label: string; value: string; className?: string }) => (
  <div className="grid grid-cols-[160px_1fr] items-center gap-4">
    <p className="text-sm font-medium">{label}</p>
    <p className={`text-sm text-muted-foreground ${className || ""}`}>{value}</p>
  </div>
);

