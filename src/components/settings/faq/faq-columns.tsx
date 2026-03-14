import type { ColumnDef } from "@tanstack/react-table";
import type { TFaq } from "@/types/faq.types";
import { ActionButtons } from "./action-buttons";

export const faqColumns: ColumnDef<TFaq>[] = [
  {
    header: "Serial No.",
    accessorKey: "id",
    cell: ({ row }) => (
      <span>
        {row.index + 1}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => (
      <span>
        {row.original.question}
      </span>
    ),
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground line-clamp-2 max-w-100">
        {row.original.answer}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-8">Actions</div>,
    cell: ({ row }) => <ActionButtons faq={row.original} />,
  },
];
