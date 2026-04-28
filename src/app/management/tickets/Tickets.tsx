/* eslint-disable @typescript-eslint/no-explicit-any */
import PageLayout from "@/components/common/page-layout";
import { ticketsColumns } from "@/components/management/tickets/tickets-columns";
import { TicketsFilter } from "@/components/management/tickets/tickets-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllSupportTicketsQuery } from "@/redux/feature/tickets/supportApis";
import type { Ticket } from "@/types/ticket";

const Tickets = () => {
  const {
    data: ticketsData,
    meta: ticketsMeta,
    isLoading,
    isError,
    isFetching,
    setPage,
    filter,
    setFilter,
  } = useSmartFetchHook<any, Ticket>(useGetAllSupportTicketsQuery);

  return (
    <PageLayout>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <PageHeader
          title="Manage Ticket"
          description="View and manage all customer tickets"
          length={ticketsMeta?.total}
        />
        <div className="w-full lg:w-auto">
          <TicketsFilter filter={filter} setFilter={setFilter} data={ticketsData} />
        </div>
      </div>
      <DataTable
        columns={ticketsColumns}
        data={ticketsData}
        meta={ticketsMeta}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Tickets;

