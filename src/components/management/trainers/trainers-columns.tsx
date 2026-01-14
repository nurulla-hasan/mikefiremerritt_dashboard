import type { ColumnDef } from "@tanstack/react-table";
import { Ban, DollarSign, User as UserIcon } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TrainerViewModal from "./view-modal";

export type Trainer = {
  id: number;
  name: string;
  email: string;
  image: string;
  views: string;
  subscriptionFee: string;
  status: "Approved" | "Rejected" | "Pending";
};

export const trainersColumns: ColumnDef<Trainer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Select All
        </span>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 60,
  },
  {
    accessorKey: "image",
    header: "Trainer Image",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.image} alt={row.original.name} />
        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Trainer Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.views}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionFee",
    header: () => <div className="text-center">Subscription Fee</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground tracking-widest">
        {row.original.subscriptionFee}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let badgeClass = "";
      
      if (status === "Approved") {
        badgeClass = "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      } else if (status === "Rejected") {
        badgeClass = "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-200 dark:border-red-800";
      } else {
        // Pending
        badgeClass = "bg-amber-50 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      }

      return (
        <div
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${badgeClass}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-14">Actions</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-1">
        <TrainerViewModal />
        <Button
          variant="outline"
          size="icon"
        >
          <UserIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
        >
          <DollarSign className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="text-amber-500 hover:text-amber-600"
        >
          <Ban className="h-4 w-4" />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
