/* eslint-disable @typescript-eslint/no-explicit-any */


import { Download, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllSpecialtiesQuery } from "@/redux/feature/specialties/specialtyApis";
import { downloadExcel } from "@/lib/utils";
import type { IProduct } from "@/types/product";

import { useLazyGetAllProductsQuery } from "@/redux/feature/products/productsApis";

interface ProductsFilterProps {
  filter?: any;
  setFilter?: (
    update: any,
    config?: { resetPage?: boolean; debounce?: boolean }
  ) => void;
  data?: IProduct[];
}

export const ProductsFilter = ({
  filter,
  setFilter,
  data = [],
}: ProductsFilterProps) => {
  const {
    data: specialtiesData,
    isLoading,
    isError,
  } = useGetAllSpecialtiesQuery(undefined);
  console.log(specialtiesData)
  const specialties = specialtiesData?.data || [];
  const [searchTerm, setSearchTerm] = useState(filter?.searchTerm || "");
  const [triggerExport] = useLazyGetAllProductsQuery();
  const [isExporting, setIsExporting] = useState(false);


  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Fetch all data from database
      const res = await triggerExport({ ...filter, limit: 999999, page: 1 }).unwrap();
      const allData = res?.data || [];
      
      if (allData.length === 0) return;

      const exportData = allData.map((product: any) => ({
        "Product Name": product.productName || "N/A",
        // "Product Description": product.productDescription || "N/A",
        Trainer: product.trainer?.trainerName || "N/A",
        Price: product.price || 0,
        Views: product.views || 0,
        Rating: product.rating || 0,
        Status: product.productStatus || "N/A",
        Date: product.createdAt
          ? new Date(product.createdAt).toLocaleDateString()
          : "N/A",
      }));

      downloadExcel(exportData, "Products", "Products List");
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePriceChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      setFilter({
        priceMin: undefined,
        priceMax: undefined,
      });
      return;
    }
    const [min, max] = value.split("-");
    setFilter({
      priceMin: Number(min),
      priceMax: max === "plus" ? undefined : Number(max),
    });
  };

  const handleViewsChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      setFilter({
        minViews: undefined,
        maxViews: undefined,
      });
      return;
    }
    const [min, max] = value.split("-");
    setFilter({
      minViews: Number(min),
      maxViews: max === "plus" ? undefined : Number(max),
    });
  };

  const handleRatingChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      setFilter({
        minRating: undefined,
        maxRating: undefined,
      });
      return;
    }
    const [min, max] = value.split("-");
    setFilter({
      minRating: Number(min),
      maxRating: Number(max),
    });
  };

  const handleStatusChange = (value: string) => {
    if (!setFilter) return;
    if (value === "all") {
      setFilter({
        status: undefined,
      });
      return;
    }
    setFilter({ status: value === "ACTIVE" ? "ACTIVE" : "INACTIVE" });
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
      <Select
        value={
          filter?.priceMin !== undefined
            ? `${filter.priceMin}-${filter.priceMax || "plus"}`
            : "all"
        }
        onValueChange={handlePriceChange}
      >
        <SelectTrigger className="w-full sm:w-fit ">
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
        value={filter?.specialtyName || "all"}
        onValueChange={(value) => {
          if (!setFilter) return;
          setFilter({
            specialtyName: value === "all" ? undefined : value,
          });
        }}
      >
        <SelectTrigger className="w-full sm:w-fit ">
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
        <SelectTrigger className="w-full sm:w-fit ">
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
        value={filter?.status || "all"}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-full sm:w-fit ">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="INACTIVE">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or specialty"
          className="pl-9  w-full"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!setFilter) return;
            setFilter(
              { searchTerm: e.target.value || undefined },
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

