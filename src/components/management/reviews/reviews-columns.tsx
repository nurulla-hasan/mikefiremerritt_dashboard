import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TReview } from "@/types/review";
import { ReviewActionButtons } from "./action-buttons";

const renderStars = (rating: number) => {
  const full = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return (
    <span className="text-amber-400 text-sm tracking-tight">
      {full}
      <span className="text-muted-foreground/40">{empty}</span>
    </span>
  );
};

export const reviewsColumns: ColumnDef<TReview>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <span className="font-semibold">Select All</span>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      </label>
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
  },
  {
    accessorKey: "user.image",
    header: "Profile",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.user.image} alt={row.original.user.fullName} />
        <AvatarFallback>{row.original.user.fullName.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "user.fullName",
    header: "User Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.user.fullName}
      </span>
    ),
  },
  {
    accessorKey: "comment",
    header: "Reviews",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground truncate max-w-xs">
        {row.original.comment}
      </span>
    ),
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.user.email}
      </span>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => renderStars(row.original.rating),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-4">Actions</div>,
    cell: ({ row }) => <ReviewActionButtons review={row.original} />,
  },
];
