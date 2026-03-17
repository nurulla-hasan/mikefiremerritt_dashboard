/* eslint-disable @typescript-eslint/no-explicit-any */
import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { downloadExcel } from "@/lib/utils";
import type { Ticket } from "@/types/ticket";

interface TicketsFilterProps {
  filter: any;
  setFilter: (update: any, config?: { debounce?: boolean }) => void;
  data?: Ticket[];
}

export const TicketsFilter = ({ filter, setFilter, data = [] }: TicketsFilterProps) => {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    const exportData = data.map((ticket: any) => ({
      'Ticket ID': ticket.ticketId || 'N/A',
      'Subject': ticket.subject || 'N/A',
      'User Email': ticket.user?.email || 'N/A',
      'Status': ticket.status || 'N/A',
      'Created Date': ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A',
    }));

    downloadExcel(exportData, "Support_Tickets", "Tickets List");
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      <Select
        value={filter?.status || "all"}
        onValueChange={(value) =>
          setFilter({
            ...filter,
            status: value === "all" ? undefined : value,
          })
        }
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="OPEN">Open</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email"
          className="pl-9 rounded-full"
          value={filter?.searchTerm || ""}
          onChange={(e) =>
            setFilter(
              (prev: any) => ({ ...prev, searchTerm: e.target.value }),
              { debounce: true }
            )
          }
        />
      </div>

      <Button 
        variant="outline" 
        className="rounded-full"
        onClick={handleExport}
        disabled={!data || data.length === 0}
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
};
