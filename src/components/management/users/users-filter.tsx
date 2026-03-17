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

interface UsersFilterProps {
  filter: any;
  setFilter: (update: any, config?: { debounce?: boolean }) => void;
  data?: IUser[];
}

export const UsersFilter = ({ filter, setFilter, data = [] }: UsersFilterProps) => {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    // Transform data for export
    const exportData = data.map((user) => ({
      'Full Name': user.fullName || 'N/A',
      'Email': user.email || 'N/A',
      'Role': user.role || 'N/A',
      'Status': user.status || 'N/A',
      'Joined Date': user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
    }));

    downloadExcel(exportData, "Users", "Users List");
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      <Select
        value={filter?.role || "all"}
        onValueChange={(value) =>
          setFilter((prev: any) => ({
            ...prev,
            role: value === "all" ? undefined : value,
          }))
        }
      >
        <SelectTrigger className="w-fit rounded-full border-muted-foreground/30">
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
        <SelectTrigger className="w-fit rounded-full border-muted-foreground/30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="BLOCKED">Blocked</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full md:w-65">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email"
          className="pl-9 pr-3 rounded-full border-muted-foreground/30 bg-background"
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
        className="rounded-full"
        onClick={handleExport}
        disabled={!data || data.length === 0}
      >
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
};
