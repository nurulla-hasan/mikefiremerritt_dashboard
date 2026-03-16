/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useState } from "react";

interface NewsfeedFilterProps {
  filter: any;
  setFilter: (filter: any) => void;
}

export const NewsfeedFilter = ({ filter, setFilter }: NewsfeedFilterProps) => {
  const [searchTerm, setSearchTerm] = useState(filter?.searchTerm || "");

  const handleViewsChange = (value: string) => {
    if (value === "all") {
      const { minViews, maxViews, ...rest } = filter;
      setFilter(rest);
      return;
    }
    const [min, max] = value.split("-");
    setFilter({
      ...filter,
      minViews: Number(min),
      maxViews: max === "plus" ? undefined : Number(max),
    });
  };

  const handleDatePresetChange = (value: string) => {
    if (value === "all") {
      const { datePreset, ...rest } = filter;
      setFilter(rest);
      return;
    }
    setFilter({ ...filter, datePreset: value });
  };

  const handleRoleChange = (value: string) => {
    if (value === "all") {
      const { role, ...rest } = filter;
      setFilter(rest);
      return;
    }
    setFilter({ ...filter, role: value });
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    if (!value) {
      const { searchTerm, ...rest } = filter;
      setFilter(rest);
      return;
    }
    setFilter({ ...filter, searchTerm: value });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      <Select
        value={filter?.datePreset || "all"}
        onValueChange={handleDatePresetChange}
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Date Created" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="last7days">Last 7 days</SelectItem>
          <SelectItem value="last30days">Last 30 days</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={
          filter?.minViews !== undefined
            ? `${filter.minViews}-${filter.maxViews || "plus"}`
            : "all"
        }
        onValueChange={handleViewsChange}
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Views" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Views</SelectItem>
          <SelectItem value="0-500">0 - 500</SelectItem>
          <SelectItem value="501-1000">501 - 1000</SelectItem>
          <SelectItem value="1001-2000">1001 - 2000</SelectItem>
          <SelectItem value="2001-plus">2000+</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter?.role || "all"}
        onValueChange={handleRoleChange}
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Account type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="MEMBER">Member</SelectItem>
          <SelectItem value="TRAINER">Trainer</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or content"
          className="pl-9 rounded-full"
          value={searchTerm}
          onChange={(e) => handleSearchTermChange(e.target.value)}
        />
      </div>

      <Button variant="outline" className="rounded-full">
        <Download />
        Export
      </Button>
    </div>
  );
};
