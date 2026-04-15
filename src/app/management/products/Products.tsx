/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import { productsColumns } from "@/components/management/products/products-columns";
import { ProductsFilter } from "@/components/management/products/products-filter";
import {
  specialtiesColumns,
  type Specialty,
} from "@/components/management/specialties/specialties-columns";
import { SpecialtiesFilter } from "@/components/management/specialties/specialties-filter";
import {
  serviceTypesColumns,
  type ServiceType,
} from "@/components/management/service-types/service-types-columns";
import { ServiceTypesFilter } from "@/components/management/service-types/service-types-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllProductsQuery } from "@/redux/feature/products/productsApis";
import { useGetAllSpecialtiesQuery } from "@/redux/feature/specialties/specialtyApis";
import { useGetAllServiceTypesQuery } from "@/redux/feature/service-types/serviceTypesApis";
import type { IProduct } from "@/types/product";

const Products = () => {
  const [activeTab, setActiveTab] = useState("products");

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

  // Lazy loading: only fetch when tab is active
  const {
    data: specialtiesData,
    meta: specialtiesMeta,
    isLoading: isSpecLoading,
    isError: isSpecError,
    isFetching: isSpecFetching,
    setPage: setSpecPage,
  } = useSmartFetchHook<any, Specialty>(useGetAllSpecialtiesQuery, {
    skip: activeTab !== "specialties",
  });

  const {
    data: serviceTypesData,
    meta: serviceTypesMeta,
    isLoading: isServiceTypeLoading,
    isError: isServiceTypeError,
    isFetching: isServiceTypeFetching,
  } = useSmartFetchHook<any, ServiceType>(useGetAllServiceTypesQuery, {
    skip: activeTab !== "service-types",
  });


  return (
    <PageLayout>
      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <PageHeader
            title="Product Management"
            description="Manage your products and specialties here"
          />
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="specialties">Specialties</TabsTrigger>
            <TabsTrigger value="service-types">Service Types</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="products" className="space-y-4">
          <div className="flex flex-col md:flex-row md:justify-end">
            <ProductsFilter filter={filter} setFilter={setFilter} data={data} />
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

        <TabsContent value="specialties" className="space-y-4">
          <div className="flex flex-col md:flex-row md:justify-end">
            <SpecialtiesFilter />
          </div>
          <DataTable
            columns={specialtiesColumns}
            data={specialtiesData}
            meta={specialtiesMeta}
            isLoading={isSpecLoading}
            isFetching={isSpecFetching}
            isError={isSpecError}
            onPageChange={setSpecPage}
          />
        </TabsContent>

        <TabsContent value="service-types" className="space-y-4">
          <div className="flex flex-col md:flex-row md:justify-end">
            <ServiceTypesFilter />
          </div>
          <DataTable
            columns={serviceTypesColumns}
            data={serviceTypesData}
            meta={serviceTypesMeta}
            isLoading={isServiceTypeLoading}
            isFetching={isServiceTypeFetching}
            isError={isServiceTypeError}
          />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Products;
