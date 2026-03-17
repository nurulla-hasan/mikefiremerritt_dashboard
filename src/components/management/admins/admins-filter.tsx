/* eslint-disable @typescript-eslint/no-explicit-any */
import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddAdminModal from "./add-modal";
import { downloadExcel } from "@/lib/utils";
import type { TAdmin } from "@/types/admin";

interface AdminsFilterProps {
  filter: any;
  setFilter: (update: any, config?: { debounce?: boolean }) => void;
  data?: TAdmin[];
}

export const AdminsFilter = ({ filter, setFilter, data = [] }: AdminsFilterProps) => {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    const exportData = data.map((admin: any) => ({
      'Name': admin.fullName || 'N/A',
      'Email': admin.email || 'N/A',
      'Role': admin.role || 'N/A',
      'Status': admin.status || 'N/A',
      'Joined Date': admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A',
    }));

    downloadExcel(exportData, "Admins", "Admins List");
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      
      <div className="relative w-full md:w-65">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email"
          className="pl-9 pr-3 rounded-full border-muted-foreground/30 bg-background"
          value={filter.searchTerm || ""}
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

      <AddAdminModal />
    </div>
  );
};
