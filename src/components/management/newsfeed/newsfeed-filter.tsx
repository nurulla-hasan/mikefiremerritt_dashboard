"use client";

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

export const NewsfeedFilter = () => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Date Created" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="last-7-days">Last 7 days</SelectItem>
          <SelectItem value="last-30-days">Last 30 days</SelectItem>
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
          <SelectValue placeholder="Account type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="trainer">Trainer</SelectItem>
        </SelectContent>
      </Select>

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
