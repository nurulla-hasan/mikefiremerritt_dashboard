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

export const UsersFilter = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      {/* Left sort (Role) */}
      <Select defaultValue="all">
        <SelectTrigger className="w-37.5 rounded-full border-muted-foreground/30">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All roles</SelectItem>
          <SelectItem value="trainer">Trainer first</SelectItem>
          <SelectItem value="individual">Individual first</SelectItem>
        </SelectContent>
      </Select>

      {/* Right sort (Status) + Export */}
      <div className="flex items-center gap-2">
        <Select defaultValue="recent">
          <SelectTrigger className="w-37.5 rounded-full border-muted-foreground/30">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most recent</SelectItem>
            <SelectItem value="active">Active first</SelectItem>
            <SelectItem value="inactive">Inactive first</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="rounded-full">
          <Download />
          Export
        </Button>

        {/* Center search + filter icon */}
        <div className="relative w-full md:w-65">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email"
            className="pl-9 pr-3 rounded-full border-muted-foreground/30 bg-background"
          />
        </div>
      </div>
    </div>
  );
};
