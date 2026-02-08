import PageLayout from "@/components/common/page-layout";
import {
  programsColumns,
  type Program,
} from "@/components/management/programs/programs-columns";
import { ProgramsFilter } from "@/components/management/programs/programs-filter";
import {
  specialtiesColumns,
  type Specialty,
} from "@/components/management/specialties/specialties-columns";
import { SpecialtiesFilter } from "@/components/management/specialties/specialties-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const programs: Program[] = [
  {
    id: 1,
    trainerName: "Jollof Rice",
    programName: "Strength Training Basics",
    price: "$299",
    views: "1.5k",
    specialty: "Strength",
    rating: 4.5,
    status: "Approved",
  },
  {
    id: 2,
    trainerName: "Fried Rice",
    programName: "12-Week Transformation Program",
    price: "$344",
    views: "1.2k",
    specialty: "Transformation",
    rating: 4.8,
    status: "Approved",
  },
  {
    id: 3,
    trainerName: "Meat Pie",
    programName: "Custom Nutrition Plan",
    price: "$299",
    views: "800",
    specialty: "Nutrition",
    rating: 4.2,
    status: "Approved",
  },
  {
    id: 4,
    trainerName: "Fish Roll",
    programName: "Strength Training Basics",
    price: "$277",
    views: "2k",
    specialty: "Strength",
    rating: 3.9,
    status: "Decline",
  },
  {
    id: 5,
    trainerName: "Puff Puff",
    programName: "Strength Training Basics",
    price: "$277",
    views: "1.1k",
    specialty: "Strength",
    rating: 4.6,
    status: "Approved",
  },
  {
    id: 6,
    trainerName: "Fried Rice",
    programName: "Strength Training Basics",
    price: "$70",
    views: "3k",
    specialty: "Strength",
    rating: 4.9,
    status: "Approved",
  },
  {
    id: 7,
    trainerName: "Fried Rice",
    programName: "Strength Training Basics",
    price: "$277",
    views: "1.5k",
    specialty: "Strength",
    rating: 4.1,
    status: "Approved",
  },
  {
    id: 8,
    trainerName: "Fried Rice",
    programName: "Strength Training Basics",
    price: "$277",
    views: "1.5k",
    specialty: "Strength",
    rating: 4.3,
    status: "Approved",
  },
  {
    id: 9,
    trainerName: "Fried Rice",
    programName: "12-Week Transformation Program",
    price: "$277",
    views: "900",
    specialty: "Transformation",
    rating: 3.8,
    status: "Decline",
  },
  {
    id: 10,
    trainerName: "Fried Rice",
    programName: "12-Week Transformation Program",
    price: "$277",
    views: "1.4k",
    specialty: "Transformation",
    rating: 4.7,
    status: "Approved",
  },
];

const specialties: Specialty[] = [
  {
    id: 1,
    name: "Strength",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Transformation",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Nutrition",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1453&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Yoga",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop",
  },
];

const meta = {
  total: programs.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(programs.length / 10),
};

const specMeta = {
  total: specialties.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(specialties.length / 10),
};

const Programs = () => {
  return (
    <PageLayout>
      <Tabs defaultValue="programs">
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <PageHeader
            title="Program Management"
            description="Manage your programs and specialties here"
          />
          <TabsList>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="specialties">Specialties</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="programs" className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row md:justify-end">
            <ProgramsFilter />
          </div>
          <DataTable columns={programsColumns} data={programs} meta={meta} />
        </TabsContent>

        <TabsContent value="specialties" className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row md:justify-end">
            <SpecialtiesFilter />
          </div>
          <DataTable
            columns={specialtiesColumns}
            data={specialties}
            meta={specMeta}
          />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Programs;
