import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { TPricingRule } from "@/types/pricing-rule";
import { format } from "date-fns";
import { PricingRuleActionButtons } from "./pricing-rule-action-buttons";

export const pricingHistoryColumns: ColumnDef<TPricingRule>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground capitalize">
        {row.original.type.replace(/_/g, " ").toLowerCase()}
      </span>
    ),
  },
  {
    accessorKey: "discountAmount",
    header: "Discount",
    cell: ({ row }) => {
      const { discountAmount, discountPercent } = row.original;
      return (
        <span className="text-sm text-muted-foreground">
          {discountAmount ? `$${discountAmount}` : discountPercent ? `${discountPercent}%` : "0"}
        </span>
      );
    },
  },
  {
    accessorKey: "usageCount",
    header: "Usage",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.usageCount} / {row.original.maxSubscribers || "∞"}
      </span>
    ),
  },
  {
    id: "dateRange",
    header: "Date Range",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.startDate), "MMM dd")} - {format(new Date(row.original.endDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "durationMonths",
    header: "Duration",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.durationMonths ? `${row.original.durationMonths} Months` : "-"}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionOffer.price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        ${row.original.subscriptionOffer.price}
      </span>
    ),
  },
  {
    id: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const now = new Date();
      const start = new Date(row.original.startDate);
      const end = new Date(row.original.endDate);

      let status = "Expired";
      let variant: "accepted" | "rejected" | "default" = "rejected";

      if (now >= start && now <= end) {
        status = "Active";
        variant = "accepted";
      } else if (now < start) {
        status = "Upcoming";
        variant = "default";
      }

      return (
        <div className="text-right">
          <Badge variant={variant} className="rounded-full px-3 capitalize">
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <PricingRuleActionButtons pricingRule={row.original} />,
  },
];
