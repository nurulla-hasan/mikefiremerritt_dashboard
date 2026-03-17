/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageHeader from "@/components/ui/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MinusCircle, Plus } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import PageLayout from "@/components/common/page-layout";
import { DataTable } from "@/components/ui/data-table";
import { pricingHistoryColumns } from "@/components/management/fees/pricing-history-columns";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllPricingRulesQuery, useAddPricingRuleMutation } from "@/redux/feature/pricing-rule/pricingRuleApis";
import type { TPricingRule } from "@/types/pricing-rule";
import { toast } from "sonner";
import { ErrorToast, SuccessToast } from "@/lib/utils";

const Fees = () => {
  const [standardFee, setStandardFee] = useState("50");
  const [subscriptionFeatures] = useState([
    "Verified badge",
    "Custom profile & products",
    "Client management tools",
    "Analytics & insights",
    "Priority support",
  ]);

  const [referralAmount, setReferralAmount] = useState("10");
  const [discountFee, setDiscountFee] = useState("50");
  const [duration, setDuration] = useState("3");
  const [timeBasedRuleName, setTimeBasedRuleName] = useState("");

  const [rewardLimit, setRewardLimit] = useState("");
  const [rewardFee, setRewardFee] = useState("45");
  const [firstComeRuleName, setFirstComeRuleName] = useState("");

  const [rewardDates, setRewardDates] = useState<DateRange | undefined>();
  const [discountDates, setDiscountDates] = useState<DateRange | undefined>();

  const {
    data: pricingData,
    meta: pricingMeta,
    isLoading,
    isError,
    isFetching,
    setPage,
  } = useSmartFetchHook<any, TPricingRule>(useGetAllPricingRulesQuery);

  const [addPricingRule, { isLoading: isAdding }] = useAddPricingRuleMutation();

  const handleSaveFirstCome = async () => {
    if (!rewardDates?.from || !rewardDates?.to || !rewardLimit || !rewardFee) {
      ErrorToast("Please fill all fields for First Come First Serve");
      return;
    }

    const payload: any = {
      subscriptionOfferId: "69803d34443d74ebcf780365", // From user's example
      type: "FIRST_COME",
      discountAmount: Number(standardFee) - Number(rewardFee),
      maxSubscribers: Number(rewardLimit),
      startDate: rewardDates.from.toISOString(),
      endDate: rewardDates.to.toISOString(),
      isActive: true,
    };

    if (firstComeRuleName) payload.name = firstComeRuleName;

    try {
      await addPricingRule(payload).unwrap();
      SuccessToast("First Come First Serve rule added successfully");
      // Reset form
      setRewardLimit("");
      setRewardDates(undefined);
      setFirstComeRuleName("");
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to add pricing rule");
    }
  };

  const handleSaveTimeBased = async () => {
    if (!discountDates?.from || !discountDates?.to || !duration || !discountFee) {
      ErrorToast("Please fill all fields for Time Period");
      return;
    }

    const payload: any = {
      subscriptionOfferId: "69803d34443d74ebcf780365", // From user's example
      type: "TIME_BASED",
      discountAmount: Number(standardFee) - Number(discountFee),
      durationMonths: Number(duration),
      startDate: discountDates.from.toISOString(),
      endDate: discountDates.to.toISOString(),
      isActive: true,
    };

    if (timeBasedRuleName) payload.name = timeBasedRuleName;

    try {
      await addPricingRule(payload).unwrap();
      SuccessToast("Time Period rule added successfully");
      // Reset form
      setDuration("3");
      setDiscountDates(undefined);
      setTimeBasedRuleName("");
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to add pricing rule");
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Fees Management"
          description="Manage subscription fees, rewards, and referral programs."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Manage Subscriptions Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-crimson text-2xl">
              Standard Subscription Fee (Monthly)
            </CardTitle>
            <CardDescription>
              Set the base monthly fee for trainers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                value={standardFee}
                onChange={(e) => setStandardFee(e.target.value)}
                className="pl-7 bg-background border-muted-foreground/20 focus:border-primary/50"
              />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-semibold text-lg font-crimson">
                Manage Subscription Features
              </h3>
              <div className="space-y-3">
                {subscriptionFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MinusCircle className="text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full dashed border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:text-primary hover:border-primary/50 py-6 rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Feature
              </Button>
            </div>

            <div className="flex justify-center pt-6 border-t">
              <Button className="px-12 rounded-full min-w-50">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Referral Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="font-crimson text-xl text-center">
                  Referral Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      value={referralAmount}
                      onChange={(e) => setReferralAmount(e.target.value)}
                      className="pl-7"
                      placeholder="10"
                    />
                  </div>
                </div>
                <div className="flex justify-center pt-2">
                  <Button 
                    className="px-8 rounded-lg min-w-37.5"
                    onClick={() => toast.info("Referral rewards update logic not implemented")}
                  >
                    Save Change
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Time Period Section */}
            <Card>
              <CardHeader>
                <CardTitle className="font-crimson text-xl text-center">
                  Time Period
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Rule Name (Optional)</Label>
                  <Input
                    value={timeBasedRuleName}
                    onChange={(e) => setTimeBasedRuleName(e.target.value)}
                    placeholder="e.g. Early Bird Discount"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Subscription Fee (Monthly)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      value={discountFee}
                      onChange={(e) => setDiscountFee(e.target.value)}
                      className="pl-7"
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Duration (Months)
                  </Label>
                  <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium font-crimson">
                    Date Range
                  </Label>
                  <DatePickerWithRange
                    date={discountDates}
                    setDate={setDiscountDates}
                    placeholder="Select date range"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <Button 
                    className="px-8 rounded-lg min-w-37.5"
                    onClick={handleSaveTimeBased}
                    disabled={isAdding}
                  >
                    {isAdding ? "Saving..." : "Save Change"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* First Come First Serve Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-crimson text-xl text-center">
                First Come First Serve
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Rule Name (Optional)</Label>
                <Input
                  value={firstComeRuleName}
                  onChange={(e) => setFirstComeRuleName(e.target.value)}
                  placeholder="e.g. Limited Offer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Limit</Label>
                  <Input
                    value={rewardLimit}
                    onChange={(e) => setRewardLimit(e.target.value)}
                    placeholder="e.g. 100"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Subscription Fee (Monthly)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      value={rewardFee}
                      onChange={(e) => setRewardFee(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium font-crimson">
                  Date Range
                </Label>
                <DatePickerWithRange
                  date={rewardDates}
                  setDate={setRewardDates}
                  placeholder="Select date range"
                />
              </div>

              <div className="flex justify-center pt-2">
                <Button 
                  className="px-8 rounded-lg min-w-37.5"
                  onClick={handleSaveFirstCome}
                  disabled={isAdding}
                >
                  {isAdding ? "Saving..." : "Save Change"}
                </Button>
              </div>
            </CardContent>
          </Card>
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
