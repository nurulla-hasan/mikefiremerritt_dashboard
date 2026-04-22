 
 
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActionButtons } from "./action-buttons";
import type { ITrainer } from "@/types/trainer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    accessorKey: "totalRevenue",
    header: "Total Revenue",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        ${row.original.totalRevenue?.toFixed(2)}
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
    cell: ({ row }) => {
      const specialties = row.original.specialty || [];
      const visibleSpecialties = specialties.slice(0, 2);
      const hasMore = specialties.length > 2;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-wrap gap-1 max-w-50 cursor-help">
                {visibleSpecialties.map((s) => (
                  <Badge key={s.id} variant="outline" className="text-[10px] px-1.5 py-0">
                    {s.specialtyName}
                  </Badge>
                ))}
                {hasMore && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    +{specialties.length - 2}
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-background border text-foreground shadow-md">
              <div className="flex flex-wrap gap-1 max-w-xs p-1">
                {specialties.map((s) => (
                  <Badge key={s.id} className="text-[10px] px-1.5 py-0">
                    {s.specialtyName}
                  </Badge>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "serviceTypes",
    header: "Service Types",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1 max-w-60">
        {row.original.serviceTypes?.map((service) => (
          <Badge
            key={service.id}
            variant="outline"
            className="text-[10px] px-1.5 py-0 whitespace-nowrap"
          >
            {service.serviceName}
          </Badge>
        ))}
        {(!row.original.serviceTypes || row.original.serviceTypes.length === 0) && (
          <span className="text-xs text-muted-foreground">N/A</span>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-8">Actions</div>,
    cell: ({ row }) => <ActionButtons trainer={row.original} />,
  },
];
