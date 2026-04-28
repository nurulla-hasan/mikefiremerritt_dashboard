/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Ticket } from "@/types/ticket";
import TicketViewModal from "./view-modal";
import TicketResponseModal from "./response-modal";

export const ticketsColumns: ColumnDef<Ticket>[] = [
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
    accessorKey: "id",
    header: "Ticket ID",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">#{row.original.id.slice(-6).toUpperCase()}</span>
    ),
  },
  {
    accessorKey: "userName",
    header: "User Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.userName}
      </span>
    ),
  },
  {
    accessorKey: "userEmail",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.userEmail}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground capitalize">
        {row.original.type.replace("_", " ").toLowerCase()}
      </span>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.original.message;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm text-muted-foreground line-clamp-1 max-w-50 cursor-help">
                {message}
              </span>
            </TooltipTrigger>
            <TooltipContent className="max-w-80">
              <p className="text-sm">{message}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === "CLOSED" ? "success" : "warning";
      return (
        <Badge variant={variant as any} className="px-3 py-1">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-3">Actions</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <TicketViewModal ticket={row.original} />
        <TicketResponseModal ticket={row.original} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
