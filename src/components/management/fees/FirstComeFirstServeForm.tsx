/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import { useAddPricingRuleMutation, useGetAllSubscriptionPlansQuery, useGetAllPricingRulesQuery } from "@/redux/feature/pricing-rules/pricingRuleApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";


const FirstComeFirstServeForm = () => {
  const [rewardLimit, setRewardLimit] = useState("");
  const [rewardFee, setRewardFee] = useState("");
  const [firstComeRuleName, setFirstComeRuleName] = useState("");
  const [rewardDates, setRewardDates] = useState<DateRange | undefined>();

  const [addPricingRule, { isLoading: isAdding }] = useAddPricingRuleMutation();
  const { data: plansData } = useGetAllSubscriptionPlansQuery(undefined);
  const { data: pricingRulesData } = useGetAllPricingRulesQuery(undefined);
  const hasInitialized = useRef(false);

  // Populate form fields from existing FIRST_COME pricing rule data
   
  useEffect(() => {
    if (!hasInitialized.current && pricingRulesData?.data) {
      const firstComeRule = pricingRulesData.data.find((rule: any) => rule.type === "FIRST_COME");
      if (firstComeRule) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFirstComeRuleName(firstComeRule.name || "");
         
        setRewardFee(firstComeRule.discountAmount?.toString() || "");
         
        setRewardLimit(firstComeRule.maxSubscribers?.toString() || "");
        if (firstComeRule.startDate && firstComeRule.endDate) {
           
          setRewardDates({
            from: new Date(firstComeRule.startDate),
            to: new Date(firstComeRule.endDate),
          });
        }
        hasInitialized.current = true;
      }
    }
  }, [pricingRulesData]);

  const handleSaveFirstCome = async () => {
    if (!rewardDates?.from || !rewardDates?.to || !rewardLimit || !rewardFee) {
      ErrorToast("Please fill all fields for First Come First Serve");
      return;
    }

    const initialPlan = plansData?.data?.find((plan: any) => plan.initialPlan === true);
    const standardPrice = initialPlan?.price || 0;

    if (Number(rewardFee) > standardPrice) {
      ErrorToast("Reward fee cannot exceed the standard subscription price");
      return;
    }

    const payload: any = {
      subscriptionOfferId: initialPlan?.id,
      type: "FIRST_COME",
      discountAmount: Number(rewardFee),
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
      // setRewardLimit("");
      // setRewardFee("");
      // setRewardDates(undefined);
      // setFirstComeRuleName("");
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to add pricing rule");
    }
  };

  return (
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
              Discount Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                value={rewardFee}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setRewardFee(val);
                  }
                }}
                placeholder="45"
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
  );
};

export default FirstComeFirstServeForm;
