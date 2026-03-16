import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { TAdmin } from "@/types/admin";
import { AdminActionButtons } from "./action-buttons";

export const adminsColumns: ColumnDef<TAdmin>[] = [
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
    accessorKey: "fullName",
    header: "Admin Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.fullName}
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "ACTIVE" ? "accepted" : "rejected"}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <AdminActionButtons admin={row.original} />,
  },
];
