import type { ColumnDef } from "@tanstack/react-table";
import SpecialtyAction from "./specialty-action";

export type Specialty = {
  id: string;
  specialtyName: string;
  specialtyImage: string;
  createdAt: string;
  updatedAt: string;
};

export const specialtiesColumns: ColumnDef<Specialty>[] = [
  {
    accessorKey: "specialtyImage",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("specialtyImage") as string;
      return (
        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
          <img
            src={image || "https://via.placeholder.com/40"}
            alt={row.getValue("specialtyName")}
            className="h-full w-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "specialtyName",
    header: "Specialty Name",
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="text-end">
          <SpecialtyAction specialty={row.original} />
        </div>
      );
    },
  },
];
