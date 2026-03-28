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


const FirstComeFirstServeForm = () => {
  const [rewardLimit, setRewardLimit] = useState("");
  const [rewardFee, setRewardFee] = useState("");
  const [firstComeRuleName, setFirstComeRuleName] = useState("");
  const [rewardDates, setRewardDates] = useState<DateRange | undefined>();

  const [addPricingRule, { isLoading: isAdding }] = useAddPricingRuleMutation();

  const handleSaveFirstCome = async () => {
    if (!rewardDates?.from || !rewardDates?.to || !rewardLimit || !rewardFee) {
      ErrorToast("Please fill all fields for First Come First Serve");
      return;
    }

    const payload: any = {
      subscriptionOfferId: "69803d34443d74ebcf780365",
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
      setRewardLimit("");
      setRewardDates(undefined);
      setFirstComeRuleName("");
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
              Subscription Fee (Monthly)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                value={rewardFee}
                onChange={(e) => setRewardFee(e.target.value)}
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
