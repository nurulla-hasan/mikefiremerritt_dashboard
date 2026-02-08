import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddSpecialtyModal from "./add-specialty-modal";

export const SpecialtiesFilter = () => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-end flex-1">
      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search specialties..."
          className="pl-9 rounded-full"
        />
      </div>

      <AddSpecialtyModal />
    </div>
  );
};
