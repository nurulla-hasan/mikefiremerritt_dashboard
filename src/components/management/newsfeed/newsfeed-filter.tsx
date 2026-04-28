/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useState } from "react";
import { downloadExcel } from "@/lib/utils";
import type { INewsfeed } from "@/types/newsfeed";

import { useLazyGetAllNewsfeedsQuery } from "@/redux/feature/newsfeed/newsfeedApis";

interface NewsfeedFilterProps {
  filter: any;
  setFilter: (update: any, config?: { debounce?: boolean }) => void;
  data?: INewsfeed[];
}

export const NewsfeedFilter = ({ filter, setFilter, data = [] }: NewsfeedFilterProps) => {
  const [searchTerm, setSearchTerm] = useState(filter?.searchTerm || "");
  const [triggerExport] = useLazyGetAllNewsfeedsQuery();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Fetch all data from database
      const res = await triggerExport({ ...filter, limit: 999999, page: 1 }).unwrap();
      const allData = res?.data || [];
      
      if (allData.length === 0) return;

      const exportData = allData.map((news: any) => ({
        'Title': news.title || 'N/A',
        'Author': news.user?.fullName || 'N/A',
        'Views': news.views || 0,
        'Date': news.createdAt ? new Date(news.createdAt).toLocaleDateString() : 'N/A',
      }));

      downloadExcel(exportData, "Newsfeed", "Newsfeed List");
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleViewsChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      setFilter({ minViews: undefined, maxViews: undefined });
      return;
    }
    const [min, max] = value.split("-");
    setFilter({
      minViews: Number(min),
      maxViews: max === "plus" ? undefined : Number(max),
    });
  };

  const handleDatePresetChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      setFilter({ datePreset: undefined });
      return;
    }
    setFilter({ datePreset: value });
  };

  const handleRoleChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      setFilter({ role: undefined });
      return;
    }
    setFilter({ role: value });
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
      <Select
        value={filter?.datePreset || "all"}
        onValueChange={handleDatePresetChange}
      >
        <SelectTrigger className="w-full sm:w-fit ">
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
        <SelectTrigger className="w-full sm:w-fit ">
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
        <SelectTrigger className="w-full sm:w-fit ">
          <SelectValue placeholder="Account type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="MEMBER">Member</SelectItem>
          <SelectItem value="TRAINER">Trainer</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title"
          className="pl-9  w-full"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setFilter(
              (prev: any) => {
                if (!e.target.value) {
                  const { searchTerm: _, ...rest } = prev;
                  return rest;
                }
                return { ...prev, searchTerm: e.target.value };
              },
              { debounce: true }
            );
          }}
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
