/* eslint-disable @typescript-eslint/no-explicit-any */
import { Download, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllSpecialtiesQuery } from "@/redux/feature/specialties/specialtyApis";
import { Button } from "@/components/ui/button";

interface TrainersFilterProps {
  filter: any;
  setFilter: (filter: any) => void;
}

export const TrainersFilter = ({ filter, setFilter }: TrainersFilterProps) => {
  const { data: specialtiesData, isLoading, isError } = useGetAllSpecialtiesQuery(undefined);
  const specialties = specialtiesData?.data || [];

  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      {/* View Count Range */}
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Min Views"
          className="w-24 rounded-full"
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
          type="number"
          placeholder="Max Views"
          className="w-24 rounded-full"
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
        <SelectTrigger className="w-fit rounded-full">
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
        value={filter?.certification || "all"}
        onValueChange={(value) =>
          setFilter((prev: any) => ({
            ...prev,
            certification: value === "all" ? undefined : value,
            page: 1,
          }))
        }
      >
        <SelectTrigger className="w-fit rounded-full">
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
      <div className="relative w-full md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          className="pl-9 rounded-full"
          value={filter?.searchTerm || ""}
          onChange={(e) =>
            setFilter((prev: any) => ({
              ...prev,
              searchTerm: e.target.value,
              page: 1,
            }))
          }
        />
      </div>
      <Button variant="outline" className="rounded-full">
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
};
