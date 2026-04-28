/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import ProductViewModal from "./view-modal";
import type { IProduct } from "@/types/product";
import StatusAction from "./status-action";

export const productsColumns: ColumnDef<IProduct>[] = [
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
    accessorKey: "trainer.trainerName",
    header: "Trainer Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.trainer?.trainerName || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.productName}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        ${row.original.price}
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
    accessorKey: "trainer.specialty",
    header: "Specialty",
    cell: ({ row }) => {
      const specialty =
        row.original.trainer?.specialty?.[0]?.specialtyName || "N/A";
      return (
        <span className="text-sm text-muted-foreground">{specialty}</span>
      );
    },
  },
  {
    accessorKey: "avgRating",
    header: "Rating",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        ⭐ {row.original.avgRating || 0}
      </span>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      const variant = isActive ? "accepted" : "rejected";
      return (
        <Badge variant={variant as any}>
          {isActive ? "Active" : "Blocked"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isApprovedByTrainer",
    header: "Trainer Approval Status",
    cell: ({ row }) => {
      const isApproved = row.original.isApprovedByTrainer;
      const variant = isApproved === "ACTIVE" ? "accepted" : "rejected";
      return (
        <Badge variant={variant as any}>
          {isApproved === "ACTIVE" ? "Approved" : "Not Approved"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-3">Actions</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <ProductViewModal data={row.original} />
        <StatusAction product={row.original} />
      </div>
    ),
  },
];


