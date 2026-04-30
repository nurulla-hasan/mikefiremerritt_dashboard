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


const TimePeriodForm = () => {
  const [discountFee, setDiscountFee] = useState("");
  // const [duration, setDuration] = useState("");
  const [timeBasedRuleName, setTimeBasedRuleName] = useState("");
  const [discountDates, setDiscountDates] = useState<DateRange | undefined>();

  const [addPricingRule, { isLoading: isAdding }] = useAddPricingRuleMutation();
  const { data: plansData } = useGetAllSubscriptionPlansQuery(undefined);
  const { data: pricingRulesData } = useGetAllPricingRulesQuery(undefined);
  const hasInitialized = useRef(false);

  // Populate form fields from existing TIME_BASED pricing rule data
   
  useEffect(() => {
    if (!hasInitialized.current && pricingRulesData?.data) {
      const timeBasedRule = pricingRulesData.data.find((rule: any) => rule.type === "TIME_BASED");
      if (timeBasedRule) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimeBasedRuleName(timeBasedRule.name || "");
         
        setDiscountFee(timeBasedRule.discountAmount?.toString() || "");
        if (timeBasedRule.startDate && timeBasedRule.endDate) {
           
          setDiscountDates({
            from: new Date(timeBasedRule.startDate),
            to: new Date(timeBasedRule.endDate),
          });
        }
        hasInitialized.current = true;
      }
    }
  }, [pricingRulesData]);

  const handleSaveTimeBased = async () => {
    if (!discountDates?.from || !discountDates?.to || !discountFee) {
      ErrorToast("Please fill all fields for Time Period");
      return;
    }

    const numericDiscountFee = Number(discountFee);

    if (numericDiscountFee <= 0) {
      ErrorToast("Subscription fee must be greater than 0");
      return;
    }

    const initialPlan = plansData?.data?.find((plan: any) => plan.initialPlan === true);
    const standardPrice = initialPlan?.price || 0;

    if (numericDiscountFee > standardPrice) {
      ErrorToast("Discount fee cannot exceed the standard subscription price");
      return;
    }

    const payload: any = {
      subscriptionOfferId: initialPlan?.id,
      type: "TIME_BASED",
      discountAmount: numericDiscountFee,
      // durationMonths: Number(duration),
      startDate: discountDates.from.toISOString(),
      endDate: discountDates.to.toISOString(),
      isActive: true,
    };

    if (timeBasedRuleName) payload.name = timeBasedRuleName;

    try {
      await addPricingRule(payload).unwrap();
      SuccessToast("Time Period rule added successfully");
      // Reset form
      // setDiscountFee("");
      // setDiscountDates(undefined);
      // setTimeBasedRuleName("");
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to add pricing rule");
    }
  };

  return (
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
            Discount Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              value={discountFee}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^\d*\.?\d*$/.test(val)) {
                  setDiscountFee(val);
                }
              }}
              className="pl-7"
              placeholder="50"
              type="text"
            />
          </div>
        </div>

        {/* <div className="space-y-2">
          <Label className="text-sm font-medium">
            Duration (Months)
          </Label>
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 3"
          />
        </div> */}

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
  );
};

export default TimePeriodForm;
