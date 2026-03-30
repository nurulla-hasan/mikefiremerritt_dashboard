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
import type { TReview } from "@/types/review";

import { useLazyGetAllReviewsQuery } from "@/redux/feature/reviews/reviewsApis";
import { useState } from "react";

interface ReviewsFilterProps {
  filter: any;
  setFilter: (update: any, config?: { debounce?: boolean }) => void;
  data?: TReview[];
}

export const ReviewsFilter = ({ filter, setFilter, data = [] }: ReviewsFilterProps) => {
  const [triggerExport] = useLazyGetAllReviewsQuery();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Fetch all data from database
      const res = await triggerExport({ ...filter, limit: 999999, page: 1 }).unwrap();
      const allData = res?.data || [];
      
      if (allData.length === 0) return;

      const exportData = allData.map((review: any) => ({
        'Reviewer': review.user?.fullName || 'N/A',
        'Trainer/Class': review.trainer?.fullName || review.product?.name || 'N/A',
        'Rating': review.rating || 0,
        'Review Text': review.comment || 'N/A',
        'Date': review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A',
      }));

      downloadExcel(exportData, "Reviews", "Reviews List");
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

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
