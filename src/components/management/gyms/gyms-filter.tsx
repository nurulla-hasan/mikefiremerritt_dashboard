;

import { Download, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddGymModal from "./add-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {
//   Select,
//   SelectContent, 
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

export const GymsFilter = () => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lagos">Lagos</SelectItem>
          <SelectItem value="florida">Florida</SelectItem>
          <SelectItem value="texas">Texas</SelectItem>
          <SelectItem value="california">California</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Views" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-500">0 - 500</SelectItem>
          <SelectItem value="501-1000">501 - 1000</SelectItem>
          <SelectItem value="1001-2000">1001 - 2000</SelectItem>
          <SelectItem value="2000+">2000+</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="4.5+">4.5 & Up</SelectItem>
          <SelectItem value="4.0+">4.0 & Up</SelectItem>
          <SelectItem value="3.5+">3.5 & Up</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="unavailable">Unavailable</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or specialty"
          className="pl-9 rounded-full"
        />
      </div>

      <AddGymModal />

      <Button variant="outline" className="rounded-full">
        <Download />
        Export
      </Button>
    </div>
  );
};
