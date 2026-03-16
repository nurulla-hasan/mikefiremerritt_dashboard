/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";

// import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { IUser } from "@/types/user";
import { format } from "date-fns";
import { ActionButtons } from "./action-buttons";

export const usersColumns: ColumnDef<IUser>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <label className="flex items-center gap-2 cursor-pointer select-none">
  //       <span className="font-semibold">
  //         Select All
  //       </span>
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected()}
  //         onCheckedChange={(value: boolean) =>
  //           table.toggleAllPageRowsSelected(!!value)
  //         }
  //         aria-label="Select all"
  //       />
  //     </label>
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    header: "User Name",
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
    accessorKey: "createdAt",
    header: "Joined Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.createdAt ? format(new Date(row.original.createdAt), "dd MMM yyyy") : "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant = "outline";
      if (status === "ACTIVE") variant = "accepted";
      if (status === "BLOCKED") variant = "rejected";
      if (status === "PENDING") variant = "warning";

      return (
        <Badge variant={variant as any}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-8">Actions</div>,
    cell: ({ row }) => <ActionButtons user={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];
