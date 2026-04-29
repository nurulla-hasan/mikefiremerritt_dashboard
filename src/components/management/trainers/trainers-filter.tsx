 
/* eslint-disable @typescript-eslint/no-explicit-any */


import { useGetAllSpecialtiesQuery } from "@/redux/feature/specialties/specialtyApis";
import { downloadExcel } from "@/lib/utils";
import type { ITrainer } from "@/types/trainer";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useLazyGetAllTrainersQuery } from "@/redux/feature/trainers/trainerApis";
import { useState } from "react";

interface TrainersFilterProps {
  filter: any;
  setFilter: (update: any, config?: { debounce?: boolean }) => void;
  data?: ITrainer[];
}

export const TrainersFilter = ({ filter, setFilter, data = [] }: TrainersFilterProps) => {
  const { data: specialtiesData, isLoading, isError } = useGetAllSpecialtiesQuery(undefined);
  const specialties = specialtiesData?.data || [];
  const [triggerExport] = useLazyGetAllTrainersQuery();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Fetch all data from database
      const res = await triggerExport({ ...filter, limit: 999999, page: 1 }).unwrap();
      const allData = res?.data || [];
      
      if (allData.length === 0) return;

      const exportData = allData.map((trainer: any) => ({
        'Trainer Name': trainer.fullName || 'N/A',
        'Email': trainer.email || 'N/A',
        'Phone': trainer.phoneNumber || 'N/A',
        'Experience': trainer.experienceYears ? `${trainer.experienceYears} years` : 'N/A',
        'Total Revenue': trainer.totalRevenue || 0,
        'Views': trainer.viewCount || 0,
        'Specialty': trainer.specialty?.map((s: any) => s.specialtyName).join(', ') || 'N/A',
        'Service Types': trainer.serviceTypes?.map((s: any) => s.serviceName).join(', ') || 'N/A',
        'Cert. Status': trainer.certifications?.some((cert: any) => typeof cert !== 'string' && cert.acceptance === false) ? 'Pending' : 'Verified',
      }));

      downloadExcel(exportData, "Trainers", "Trainers List");
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
      {/* ... (Existing Filter components) */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Input
          // type="number"
          placeholder="Min Views"
          className="w-full sm:w-24"
          value={filter?.minViews || ""}
          onChange={(e) =>
            setFilter((prev: any) => ({
              ...prev,
              minViews: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            }))
          }
        />
        <Input
          // type="number"
          placeholder="Max Views"
          className="w-full sm:w-24"
          value={filter?.maxViews || ""}
          onChange={(e) =>
            setFilter((prev: any) => ({
              ...prev,
              maxViews: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            }))
          }
        />
      </div>

      <Select
        value={filter?.subscriptionPlan || "all"}
        onValueChange={(value) =>
          setFilter((prev: any) => ({
            ...prev,
            subscriptionPlan: value === "all" ? undefined : value,
            page: 1,
          }))
        }
      >
        <SelectTrigger className="w-full sm:w-fit ">
          <SelectValue placeholder="Subscription" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plan</SelectItem>
          <SelectItem value="FREE">Free</SelectItem>
          <SelectItem value="PAID">Paid</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter?.specialtyName || "all"}
        onValueChange={(value) =>
          setFilter((prev: any) => ({
            ...prev,
            specialtyName: value === "all" ? undefined : value,
            page: 1,
          }))
        }
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
        value={filter?.certification || "all"}
        onValueChange={(value) =>
          setFilter((prev: any) => ({
            ...prev,
            certification: value === "all" ? undefined : value,
            page: 1,
          }))
        }
      >
        <SelectTrigger className="w-full sm:w-fit ">
          <SelectValue placeholder="Certifications" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Certs</SelectItem>
          <SelectItem value="NASM">NASM</SelectItem>
          <SelectItem value="ACE">ACE</SelectItem>
          <SelectItem value="NACM">NACM</SelectItem>
        </SelectContent>
      </Select>

      {/* Search with Filter Icon */}
      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          className="pl-9  w-full"
          value={filter?.searchTerm || ""}
          onChange={(e) =>
            setFilter(
              (prev: any) => ({
                ...prev,
                searchTerm: e.target.value,
                page: 1,
              }),
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
