/* eslint-disable @typescript-eslint/no-explicit-any */


import { Download, Search, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { downloadExcel } from "@/lib/utils";

import { useLazyGetAllSubscriptionsQuery } from "@/redux/feature/subscriptions/subscriptionApis";
import { useState } from "react";

interface SubscriptionsFilterProps {
  filter: any;
  setFilter: (update: any, config?: { debounce?: boolean }) => void;
  data?: any[];
}

export const SubscriptionsFilter = ({
  filter,
  setFilter,
  data = []
}: SubscriptionsFilterProps) => {
  const [triggerExport] = useLazyGetAllSubscriptionsQuery();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Fetch all data from database
      const res = await triggerExport({ ...filter, limit: 999999, page: 1 }).unwrap();
      const allData = res?.data || [];
      
      if (allData.length === 0) return;

      const exportData = allData.map((sub: any) => ({
        'User Name': sub.user?.fullName || 'N/A',
        'Email': sub.user?.email || 'N/A',
        'Plan Type': sub.planType || 'N/A',
        'Status': sub.status || 'N/A',
        'Start Date': sub.startDate ? new Date(sub.startDate).toLocaleDateString() : 'N/A',
        'End Date': sub.endDate ? new Date(sub.endDate).toLocaleDateString() : 'N/A',
        'Amount': sub.amount || 0,
      }));

      downloadExcel(exportData, "Subscriptions", "Subscriptions List");
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
      <Button
        asChild
        className=" bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
      >
        <Link to="/management/fees" className="flex items-center justify-center">
          <Settings2 />
          Fees
        </Link>
      </Button>

      <Select
        value={
          filter?.priceMin !== undefined || filter?.priceMax !== undefined
            ? `${filter.priceMin}-${filter.priceMax || "plus"}`
            : "all"
        }
        onValueChange={(value) => {
          if (!setFilter) return;
          if (value === "all") {
            setFilter({
              priceMin: undefined,
              priceMax: undefined,
              amount: undefined,
            });
            return;
          }

          let priceMin: number | undefined = undefined;
          let priceMax: number | undefined = undefined;

          if (value === "0-100") {
            priceMin = 0;
            priceMax = 100;
          } else if (value === "101-500") {
            priceMin = 101;
            priceMax = 500;
          } else if (value === "501-1000") {
            priceMin = 501;
            priceMax = 1000;
          } else if (value === "1000-plus") {
            priceMin = 1000;
            priceMax = undefined;
          }

          setFilter({ priceMin, priceMax, amount: undefined });
        }}
      >
        <SelectTrigger className="w-full sm:w-fit ">
          <SelectValue placeholder="Amount Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Range</SelectItem>
          <SelectItem value="0-100">0 - 100</SelectItem>
          <SelectItem value="101-500">101 - 500</SelectItem>
          <SelectItem value="501-1000">501 - 1000</SelectItem>
          <SelectItem value="1000-plus">1000+</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={
          filter?.totalReferralsMin !== undefined || filter?.totalReferralsMax !== undefined
            ? `${filter.totalReferralsMin}-${filter.totalReferralsMax || "plus"}`
            : "all"
        }
        onValueChange={(value) => {
          if (!setFilter) return;
          if (value === "all") {
            setFilter({
              totalReferralsMin: undefined,
              totalReferralsMax: undefined,
            });
            return;
          }

          let min: number | undefined = undefined;
          let max: number | undefined = undefined;

          if (value === "0-5") {
            min = 0;
            max = 5;
          } else if (value === "6-10") {
            min = 6;
            max = 10;
          } else if (value === "11+") {
            min = 11;
            max = undefined;
          }

          setFilter({ totalReferralsMin: min, totalReferralsMax: max });
        }}
      >
        <SelectTrigger className="w-full sm:w-fit ">
          <SelectValue placeholder="Referrals" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Referrals</SelectItem>
          <SelectItem value="0-5">0 - 5</SelectItem>
          <SelectItem value="6-10">6 - 10</SelectItem>
          <SelectItem value="11+">11+</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email"
          className="pl-9  w-full"
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
