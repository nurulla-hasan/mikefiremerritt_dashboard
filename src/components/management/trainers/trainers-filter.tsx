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

export const TrainersFilter = () => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      {/* Left Filters */}
      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="View Count" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-100">0 - 100</SelectItem>
          <SelectItem value="101-500">101 - 500</SelectItem>
          <SelectItem value="501-1000">501 - 1000</SelectItem>
          <SelectItem value="1000+">1000+</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Subscription Fee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Specialty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yoga">Yoga</SelectItem>
          <SelectItem value="fitness">Fitness</SelectItem>
          <SelectItem value="nutrition">Nutrition</SelectItem>
          <SelectItem value="crossfit">CrossFit</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Certifications" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nasm">NASM</SelectItem>
          <SelectItem value="ace">ACE</SelectItem>
          <SelectItem value="nacm">NACM</SelectItem>
        </SelectContent>
      </Select>

      {/* Search with Filter Icon */}
      <div className="relative w-full md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or specialty"
          className="pl-9 rounded-full"
        />
      </div>
      <Button variant="outline" className="rounded-full">
        <Download />
        Export
      </Button>
    </div>
  );
};
