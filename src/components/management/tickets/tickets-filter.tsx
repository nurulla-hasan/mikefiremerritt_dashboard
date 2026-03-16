/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

interface TicketsFilterProps {
  filter: any;
  setFilter: (filter: any) => void;
}

export const TicketsFilter = ({ filter, setFilter }: TicketsFilterProps) => {
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
            setFilter({ ...filter, searchTerm: e.target.value })
          }
        />
      </div>

      <Button variant="outline" className="rounded-full">
        <Download />
        Export
      </Button>
    </div>
  );
};
