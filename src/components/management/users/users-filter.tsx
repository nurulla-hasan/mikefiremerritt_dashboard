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
import type { IUser } from "@/types/user";
import { downloadExcel } from "@/lib/utils";

import { useLazyGetAllUsersQuery } from "@/redux/feature/users/userApis";
import { useState } from "react";

interface UsersFilterProps {
  filter: any;
  setFilter: (update: any, config?: { debounce?: boolean }) => void;
  data?: IUser[];
}

export const UsersFilter = ({ filter, setFilter, data = [] }: UsersFilterProps) => {
  const [triggerExport] = useLazyGetAllUsersQuery();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Fetch all data from database by passing a very large limit
      const res = await triggerExport({ ...filter, limit: 999999, page: 1 }).unwrap();
      const allData = res?.data || [];
      
      if (allData.length === 0) return;

      // Transform data for export
      const exportData = allData.map((user: IUser) => ({
        'Full Name': user.fullName || 'N/A',
        'Email': user.email || 'N/A',
        'Role': user.role || 'N/A',
        'Status': user.status || 'N/A',
        'Joined Date': user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
      }));

      downloadExcel(exportData, "Users", "Users List");
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
      <Select
        value={filter?.role || "all"}
        onValueChange={(value) =>
          setFilter((prev: any) => ({
            ...prev,
            role: value === "all" ? undefined : value,
          }))
        }
      >
        <SelectTrigger className="w-full sm:w-35  border-muted-foreground/30">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Role</SelectItem>
          <SelectItem value="TRAINER">Trainer</SelectItem>
          <SelectItem value="MEMBER">Member</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter?.userStatus || "all"}
        onValueChange={(value) =>
          setFilter((prev: any) => ({
            ...prev,
            userStatus: value === "all" ? undefined : value,
          }))
        }
      >
        <SelectTrigger className="w-full sm:w-35  border-muted-foreground/30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="BLOCKED">Blocked</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full sm:w-65">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email"
          className="pl-9 pr-3  border-muted-foreground/30 bg-background w-full"
          value={filter?.searchTerm || ""}
          onChange={(e) =>
            setFilter(() => ({searchTerm: e.target.value,}),
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
