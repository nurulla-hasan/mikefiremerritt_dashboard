import PageLayout from "@/components/common/page-layout";
import { faqColumns } from "@/components/settings/faq/faq-columns";
import { FAQFilter } from "@/components/settings/faq/faq-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { useGetAllFaqsQuery } from "@/redux/feature/faq/faqApis";

const FAQPage = () => {
  const { data: faqData, isLoading, isError } = useGetAllFaqsQuery({});

  const faqs = faqData?.data || [];

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="FAQ Management"
          description="Manage frequently asked questions"
        />
        <FAQFilter />
      </div>
      <DataTable
        columns={faqColumns}
        data={faqs}
        isLoading={isLoading}
        isError={isError}
      />
    </PageLayout>
  );
};

export default FAQPage;
