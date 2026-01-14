import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import GymViewModal from "./view-modal";

export type Gym = {
  id: number;
  name: string;
  location: string;
  views: string;
  status: "Active" | "Unavailable"; 
};

export const gymsColumns: ColumnDef<Gym>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Select All</span>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "name",
    header: "Gym Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "location",
    header: "Gym Location",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.location}</span>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.views}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const active = row.original.status === "Active";
      const cls = active
        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
        : "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400";
      return (
        <div
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${cls}`}
        >
          {row.original.status}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-9">Actions</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-1">
        <GymViewModal />
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
          <Trash2 />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

