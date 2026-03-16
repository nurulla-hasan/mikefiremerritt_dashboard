/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

interface SubscriptionsFilterProps {
  filter: any;
  setFilter: (filter: any) => void;
}

export const SubscriptionsFilter = ({
  filter,
  setFilter,
}: SubscriptionsFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      <Button
        asChild
        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Link to="/management/fees" className="flex items-center">
          <Settings2 />
          Fees
        </Link>
      </Button>

      <Select
        value={filter.amountRange || "all"}
        onValueChange={(value) => {
          let priceMin = "";
          let priceMax = "";
          if (value === "0-100") {
            priceMin = "0";
            priceMax = "100";
          } else if (value === "101-500") {
            priceMin = "101";
            priceMax = "500";
          } else if (value === "501-1000") {
            priceMin = "501";
            priceMax = "1000";
          } else if (value === "1000+") {
            priceMin = "1000";
            priceMax = "";
          }
          setFilter({ amountRange: value, priceMin, priceMax });
        }}
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Amount" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Amounts</SelectItem>
          <SelectItem value="0-100">0 - 100</SelectItem>
          <SelectItem value="101-500">101 - 500</SelectItem>
          <SelectItem value="501-1000">501 - 1000</SelectItem>
          <SelectItem value="1000+">1000+</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter.referralRange || "all"}
        onValueChange={(value) => {
          let totalReferralsMin = "";
          let totalReferralsMax = "";
          if (value === "0-5") {
            totalReferralsMin = "0";
            totalReferralsMax = "5";
          } else if (value === "6-10") {
            totalReferralsMin = "6";
            totalReferralsMax = "10";
          } else if (value === "11+") {
            totalReferralsMin = "11";
            totalReferralsMax = "";
          }
          setFilter({ referralRange: value, totalReferralsMin, totalReferralsMax });
        }}
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Referrals" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Referrals</SelectItem>
          <SelectItem value="0-5">0 - 5</SelectItem>
          <SelectItem value="6-10">6 - 10</SelectItem>
          <SelectItem value="11+">11+</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter.duration || "all"}
        onValueChange={(value) =>
          setFilter({ duration: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plans</SelectItem>
          <SelectItem value="MONTHLY">Monthly</SelectItem>
          <SelectItem value="YEARLY">Yearly</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email"
          className="pl-9 rounded-full"
          value={filter.searchTerm || ""}
          onChange={(e) => setFilter({ searchTerm: e.target.value })}
        />
      </div>

      <Button variant="outline" className="rounded-full">
        <Download />
        Export
      </Button>
    </div>
  );
};
