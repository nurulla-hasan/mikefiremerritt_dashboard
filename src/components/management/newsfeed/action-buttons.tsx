/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState } from "react";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useUpdateNewsfeedStatusMutation } from "@/redux/feature/newsfeed/newsfeedApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import NewsfeedViewModal from "./view-modal";
import type { INewsfeed } from "@/types/newsfeed";

interface ActionButtonsProps {
  data: INewsfeed;
}

export const ActionButtons = ({ data }: ActionButtonsProps) => {
  const [updateStatus, { isLoading }] = useUpdateNewsfeedStatusMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleStatus = async () => {
    try {
      await updateStatus({ id: data.id }).unwrap();
      setIsModalOpen(false);
      SuccessToast(`Post status updated to ${data.isBlocked ? "Active" : "Blocked"}`);
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to update post status");
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <NewsfeedViewModal data={data} />
      <ConfirmationModal
        title={data.isPublished ? "Unpublish Post" : "Publish Post"}
        description={`Are you sure you want to ${data.isPublished ? "unpublish" : "publish"} this post?`}
        confirmText={data.isPublished ? "Unpublish" : "Publish"}
        isLoading={isLoading}
        onConfirm={handleToggleStatus}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        loadingText={data.isPublished ? "Unpublishing..." : "Publishing..."}
        trigger={
          <Button
            variant="ghost"
            size="icon-sm"
            className={data.isPublished ? "text-emerald-500 hover:text-emerald-600" : "text-amber-500 hover:text-amber-600"}
          >
            <Ban className="size-4" />
          </Button>
        }
      />
    </div>
  );
};
