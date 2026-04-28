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

import { useLazyGetAllSupportTicketsQuery } from "@/redux/feature/tickets/supportApis";
import { useState } from "react";

interface TicketsFilterProps {
  filter: any;
  setFilter: (update: any, config?: { debounce?: boolean }) => void;
  data?: Ticket[];
}

export const TicketsFilter = ({ filter, setFilter, data = [] }: TicketsFilterProps) => {
  const [triggerExport] = useLazyGetAllSupportTicketsQuery();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Fetch all data from database
      const res = await triggerExport({ ...filter, limit: 999999, page: 1 }).unwrap();
      const allData = res?.data || [];
      
      if (allData.length === 0) return;

      const exportData = allData.map((ticket: any) => ({
        'Ticket ID': ticket.ticketId || 'N/A',
        'Subject': ticket.subject || 'N/A',
        'User Email': ticket.user?.email || 'N/A',
        'Status': ticket.status || 'N/A',
        'Created Date': ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A',
      }));

      downloadExcel(exportData, "Support_Tickets", "Tickets List");
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
      <Select
        value={filter?.status || "all"}
        onValueChange={(value) =>
          setFilter({
            ...filter,
            status: value === "all" ? undefined : value,
          })
        }
      >
        <SelectTrigger className="w-full sm:w-fit ">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="OPEN">Open</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email"
          className="pl-9  w-full"
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
        className=" w-full sm:w-auto"
        onClick={handleExport}
        loading={isExporting}
        loadingText="Exporting..."
        disabled={!data || data.length === 0}
      >
        <Download />
        Export
      </Button>
    </div>
  );
};
