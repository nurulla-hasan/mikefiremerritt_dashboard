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

export const SubscriptionsFilter = () => {
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

      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Start Date" />
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
          <SelectValue placeholder="Amount" />
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
          <SelectValue placeholder="Referrals" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-5">0 - 5</SelectItem>
          <SelectItem value="6-10">6 - 10</SelectItem>
          <SelectItem value="11+">11+</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
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
