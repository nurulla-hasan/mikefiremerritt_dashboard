import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Specialty = {
  id: number;
  name: string;
  image: string;
};

export const specialtiesColumns: ColumnDef<Specialty>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
          <img
            src={image || "https://via.placeholder.com/40"}
            alt={row.getValue("name")}
            className="h-full w-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Specialty Name",
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: () => {
      return (
        <div className="text-end">
          <Button variant="ghost" size="icon-sm" className="gap-2">
            <Edit/>
          </Button>
          <Button variant="ghost" size="icon-sm" className="gap-2 text-destructive">
            <Trash2/>
          </Button>
        </div>
      );
    },
  },
];
