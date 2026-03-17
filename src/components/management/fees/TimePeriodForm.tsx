/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import { useAddPricingRuleMutation } from "@/redux/feature/pricing-rule/pricingRuleApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";

interface TimePeriodFormProps {
  standardFee: string;
}

const TimePeriodForm = ({ standardFee }: TimePeriodFormProps) => {
  const [discountFee, setDiscountFee] = useState("");
  const [duration, setDuration] = useState("");
  const [timeBasedRuleName, setTimeBasedRuleName] = useState("");
  const [discountDates, setDiscountDates] = useState<DateRange | undefined>();

  const [addPricingRule, { isLoading: isAdding }] = useAddPricingRuleMutation();

  const handleSaveTimeBased = async () => {
    if (!discountDates?.from || !discountDates?.to || !duration || !discountFee) {
      ErrorToast("Please fill all fields for Time Period");
      return;
    }

    const payload: any = {
      subscriptionOfferId: "69803d34443d74ebcf780365",
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
  );
};

export default TimePeriodForm;
