/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { TSubscription } from "@/types/subscription";

export const subscriptionsColumns: ColumnDef<TSubscription>[] = [
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
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={row.original.trainerInfo.image || ""}
            alt={row.original.trainerInfo.name}
          />
          <AvatarFallback>{row.original.trainerInfo.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {row.original.trainerInfo.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.trainerInfo.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.startDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "endDate",
    header: "Expire Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.endDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionOffer.duration",
    header: "Plan",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground capitalize">
        {row.original.subscriptionOffer.duration.toLowerCase()}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionOffer.price",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        ${row.original.subscriptionOffer.price}
      </span>
    ),
  },
  {
    accessorKey: "trainerInfo.totalReferrals",
    header: "Referrals",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.trainerInfo.totalReferrals}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionState",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.subscriptionState;
      const variant = status === "active" ? "accepted" : "rejected";
      return (
        <Badge variant={variant as any} className="rounded-full px-3 py-1 capitalize">
          {status}
        </Badge>
      );
    },
  },
];
