import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",

          secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",

        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",

        ghost:
          "border-transparent bg-transparent hover:bg-muted text-foreground",

        muted:
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",

        success:
          "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-50 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800 backdrop-blur-sm",

        info: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 backdrop-blur-sm",

        progress:
          "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 backdrop-blur-sm",

        accepted:
          "bg-green-50 text-green-600 border-green-100 hover:bg-green-50 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 backdrop-blur-sm",

        warning:
          "bg-yellow-50 text-yellow-600 border-yellow-100 hover:bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800 backdrop-blur-sm",

        rejected: "bg-red-50 text-red-600 border-red-100 hover:bg-red-50 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
