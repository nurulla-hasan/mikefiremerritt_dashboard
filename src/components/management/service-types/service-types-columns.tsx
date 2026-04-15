import type { ColumnDef } from "@tanstack/react-table";
import ServiceTypeAction from "./service-type-action";

export type ServiceType = {
  id: string;
  serviceName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export const serviceTypesColumns: ColumnDef<ServiceType>[] = [
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
    accessorKey: "serviceName",
    header: "Service Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.serviceName}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.updatedAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="text-end">
          <ServiceTypeAction serviceType={row.original} />
        </div>
      );
    },
  },
];
