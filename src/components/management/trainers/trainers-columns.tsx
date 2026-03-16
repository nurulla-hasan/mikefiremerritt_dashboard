/* eslint-disable @typescript-eslint/no-explicit-any */
 
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActionButtons } from "./action-buttons";
import type { ITrainer } from "@/types/trainer";

export const trainersColumns: ColumnDef<ITrainer>[] = [
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
    header: "Trainer Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={row.original.image || ""} alt={row.original.fullName} />
          <AvatarFallback>{row.original.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-foreground">
          {row.original.fullName}
        </span>
      </div>
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
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.phoneNumber}
      </span>
    ),
  },
  {
    accessorKey: "experienceYears",
    header: "Experience",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.experienceYears} Years
      </span>
    ),
  },
  {
    accessorKey: "viewCount",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.viewCount}
      </span>
    ),
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1 max-w-50">
        {row.original.specialty?.map((s) => (
          <Badge key={s.id} variant="outline" className="text-[10px] px-1.5 py-0">
            {s.specialtyName}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "isProfileComplete",
    header: "Profile Status",
    cell: ({ row }) => {
      const isProfileComplete = row.original.isProfileComplete;
      let variant = "outline";
      if (isProfileComplete === true) variant = "accepted";
      if (isProfileComplete === false) variant = "rejected";

      return (
        <Badge variant={variant as any}>
          {isProfileComplete === true ? "Complete" : "Incomplete"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-8">Actions</div>,
    cell: ({ row }) => <ActionButtons trainer={row.original} />,
  },
];
