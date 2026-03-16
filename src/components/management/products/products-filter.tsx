/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { Download, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddProgramModal from "./add-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllSpecialtiesQuery } from "@/redux/feature/specialties/specialtyApis";

interface ProductsFilterProps {
  filter?: any;
  setFilter?: (filter: any) => void;
}

export const ProductsFilter = ({ filter, setFilter }: ProductsFilterProps) => {
  const { data: specialtiesData, isLoading, isError } = useGetAllSpecialtiesQuery(undefined);
  const specialties = specialtiesData?.data || [];
  const [searchTerm, setSearchTerm] = useState(filter?.searchTerm || "");

  const handlePriceChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      const { priceMin: _min, priceMax: _max, ...rest } = filter || {};
      setFilter(rest);
      return;
    }
    const [min, max] = value.split("-");
    setFilter({
      ...filter,
      priceMin: Number(min),
      priceMax: max === "plus" ? undefined : Number(max),
    });
  };

  const handleViewsChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      const { minViews: _min, maxViews: _max, ...rest } = filter || {};
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

  const handleRatingChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      const { minRating: _min, maxRating: _max, ...rest } = filter || {};
      setFilter(rest);
      return;
    }
    const [min, max] = value.split("-");
    setFilter({
      ...filter,
      minRating: Number(min),
      maxRating: Number(max),
    });
  };

  const handleStatusChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      const { isActive: _active, ...rest } = filter || {};
      setFilter(rest);
      return;
    }
    setFilter({ ...filter, isActive: value === "true" });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (!setFilter) return;
    if (!value) {
      const { searchTerm: _search, ...rest } = filter || {};
      setFilter(rest);
      return;
    }
    setFilter({ ...filter, searchTerm: value });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      <Select
        value={
          filter?.priceMin !== undefined
            ? `${filter.priceMin}-${filter.priceMax || "plus"}`
            : "all"
        }
        onValueChange={handlePriceChange}
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Price Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Prices</SelectItem>
          <SelectItem value="0-100">$0 - $100</SelectItem>
          <SelectItem value="101-300">$101 - $300</SelectItem>
          <SelectItem value="301-500">$301 - $500</SelectItem>
          <SelectItem value="501-plus">$500+</SelectItem>
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
        value={filter?.specialtyName || "all"}
        onValueChange={(value) => {
          if (!setFilter) return;
          setFilter((prev: any) => ({
            ...prev,
            specialtyName: value === "all" ? undefined : value,
            page: 1,
          }));
        }}
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Specialty" />
        </SelectTrigger>
        <SelectContent className="max-h-62.5">
          <SelectItem value="all">All Specialty</SelectItem>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <span className="text-xs text-muted-foreground">Loading...</span>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center p-4">
              <span className="text-xs text-destructive">Failed to load</span>
            </div>
          ) : (
            specialties.map((s: any) => (
              <SelectItem key={s.id} value={s.specialtyName}>
                {s.specialtyName}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      <Select
        value={
          filter?.minRating !== undefined
            ? `${filter.minRating}-${filter.maxRating}`
            : "all"
        }
        onValueChange={handleRatingChange}
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Ratings" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ratings</SelectItem>
          <SelectItem value="4-5">4.0 & Up</SelectItem>
          <SelectItem value="3-5">3.0 & Up</SelectItem>
          <SelectItem value="2-5">2.0 & Up</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={
          filter?.isActive !== undefined ? filter.isActive.toString() : "all"
        }
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or specialty"
          className="pl-9 rounded-full"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <AddProgramModal />

      <Button variant="outline" className="rounded-full">
        <Download />
        Export
      </Button>
    </div>
  );
};

