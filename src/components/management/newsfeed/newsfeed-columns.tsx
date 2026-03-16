
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ActionButtons } from "./action-buttons";
import type { INewsfeed } from "@/types/newsfeed";

export const newsfeedColumns: ColumnDef<INewsfeed>[] = [
  {
    header: "SL",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return (
        <span className="text-sm font-medium text-foreground">
          {pageIndex * pageSize + row.index + 1}
        </span>
      );
    },
  },
  {
    accessorKey: "user.image",
    header: "Profile",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.user?.image || ""} alt={row.original.user?.fullName} />
        <AvatarFallback>{row.original.user?.fullName?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "user.fullName",
    header: "Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.user?.fullName || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground line-clamp-1 max-w-50">
        {row.original.content || "No content"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.createdAt ? formatDate(row.original.createdAt) : "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "impressionCount",
    header: "Impressions",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.impressionCount ?? 0}
      </span>
    ),
  },
  {
    accessorKey: "user.role",
    header: "Account Type",
    cell: ({ row }) => {
      const role = row.original.user?.role || "USER";
      return (
        <Badge
          variant="outline"
          className="rounded-full px-3 py-1 capitalize border-border"
        >
          {role.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.original.isPublished;
      return (
        <Badge
          variant={isPublished ? "accepted" : "rejected"}
          className="rounded-full px-3 py-1"
        >
          {isPublished ? "Published" : "Unpublished"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-6">Actions</div>,
    cell: ({ row }) => <ActionButtons data={row.original} />,
  },
];
