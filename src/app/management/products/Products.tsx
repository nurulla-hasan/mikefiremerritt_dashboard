/* eslint-disable @typescript-eslint/no-explicit-any */
import PageLayout from "@/components/common/page-layout";
import { productsColumns } from "@/components/management/products/products-columns";
import { ProductsFilter } from "@/components/management/products/products-filter";
import {
  specialtiesColumns,
  type Specialty,
} from "@/components/management/specialties/specialties-columns";
import { SpecialtiesFilter } from "@/components/management/specialties/specialties-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllProductsQuery } from "@/redux/feature/products/productsApis";
import type { IProduct } from "@/types/product";


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
const specMeta = {
  total: specialties.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(specialties.length / 10),
};

const Products = () => {
  const {
    data,
    meta,
    isLoading,
    isError,
    isFetching,
    setPage,
    filter,
    setFilter,
  } = useSmartFetchHook<any, IProduct>(useGetAllProductsQuery);

  return (
    <PageLayout>
      <Tabs defaultValue="products">
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <PageHeader
            title="Product Management"
            description="Manage your products and specialties here"
          />
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="specialties">Specialties</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="products" className="space-y-4">
          <div className="flex flex-col md:flex-row md:justify-end">
            <ProductsFilter filter={filter} setFilter={setFilter} />
          </div>
          <DataTable
            columns={productsColumns}
            data={data}
            meta={meta}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            onPageChange={setPage}
          />
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

export default Products;
