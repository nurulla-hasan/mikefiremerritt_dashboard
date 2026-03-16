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

interface ReviewsFilterProps {
  filter: any;
  setFilter: (filter: any) => void;
}

export const ReviewsFilter = ({ filter, setFilter }: ReviewsFilterProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <Select
          value={filter.sortOrder || "desc"}
          onValueChange={(value) => setFilter({ sortOrder: value })}
        >
          <SelectTrigger className="w-fit rounded-full">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filter.rating || "all"}
          onValueChange={(value) =>
            setFilter({ rating: value === "all" ? "" : value })
          }
        >
          <SelectTrigger className="w-30 rounded-full">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          className="pl-9 rounded-full"
          value={filter.searchTerm || ""}
          onChange={(e) => setFilter({ searchTerm: e.target.value })}
        />
      </div>

      <Button variant="outline" className="rounded-full">
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
};
