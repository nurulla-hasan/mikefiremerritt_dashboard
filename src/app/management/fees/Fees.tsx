/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageHeader from "@/components/ui/page-header";
import PageLayout from "@/components/common/page-layout";
import { DataTable } from "@/components/ui/data-table";
import { pricingHistoryColumns } from "@/components/management/fees/pricing-history-columns";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllPricingRulesQuery } from "@/redux/feature/pricing-rule/pricingRuleApis";
import type { TPricingRule } from "@/types/pricing-rule";
import StandardSubscriptionFee from "@/components/management/fees/StandardSubscriptionFee";
import ReferralRewards from "@/components/management/fees/ReferralRewards";
import TimePeriodForm from "@/components/management/fees/TimePeriodForm";
import FirstComeFirstServeForm from "@/components/management/fees/FirstComeFirstServeForm";

const Fees = () => {
  const [standardFee, setStandardFee] = useState("");

  const {
    data: pricingData,
    meta: pricingMeta,
    isLoading,
    isError,
    isFetching,
    setPage,
  } = useSmartFetchHook<any, TPricingRule>(useGetAllPricingRulesQuery);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Fees Management"
          description="Manage subscription fees, rewards, and referral Products."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          {/* Manage Subscriptions Section */}
          <StandardSubscriptionFee
            standardFee={standardFee}
            setStandardFee={setStandardFee}
          />
          {/* Referral Rewards */}
          <ReferralRewards />
        </div>

        <div className="space-y-6">
          {/* Time Period Section */}
          <TimePeriodForm />
          {/* First Come First Serve Section */}
          <FirstComeFirstServeForm />
        </div>
      </div>

      <div className="space-y-4">
        <PageHeader
          title="Pricing History"
          description="View past and scheduled custom pricing details."
        />
        <DataTable
          columns={pricingHistoryColumns}
          data={pricingData}
          meta={pricingMeta}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          onPageChange={setPage}
        />
      </div>
    </PageLayout>
  );
};

export default Fees;
