/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PageLayout from "@/components/common/page-layout";
import { reviewsColumns } from "@/components/management/reviews/reviews-columns";
import { ReviewsFilter } from "@/components/management/reviews/reviews-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllReviewsQuery } from "@/redux/feature/reviews/reviewsApis";
import type { TReview } from "@/types/review";

const Reviews = () => {
  const {
    data: reviewsData,
    meta: reviewsMeta,
    isLoading,
    isError,
    isFetching,
    setPage,
    filter,
    setFilter,
  } = useSmartFetchHook<any, TReview>(useGetAllReviewsQuery);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="Reviews"
          description="Manage all system reviews"
          length={reviewsMeta?.total}
        />
        <ReviewsFilter filter={filter} setFilter={setFilter} />
      </div>
      <DataTable
        columns={reviewsColumns}
        data={reviewsData}
        meta={reviewsMeta}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Reviews;
