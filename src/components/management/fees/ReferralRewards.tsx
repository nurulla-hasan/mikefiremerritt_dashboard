/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetReferralRewardQuery, useUpdateReferralRewardMutation } from "@/redux/feature/referral/referralApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";

const ReferralRewards = () => {
  const [userAmount, setUserAmount] = useState<string | null>(null);
  const { data, isLoading: isFetching } = useGetReferralRewardQuery(undefined);
  const [updateReferralReward, { isLoading: isUpdating }] = useUpdateReferralRewardMutation();

  // Derived state: Use user input if they typed something, otherwise use data from API
  const apiAmount = data?.data && Array.isArray(data.data) && data.data.length > 0
    ? data.data[0].rewardAmount.toString()
    : data?.data?.rewardAmount?.toString() || "";

  const rewardAmount = userAmount !== null ? userAmount : apiAmount;
  const rewardId = data?.data && Array.isArray(data.data) && data.data.length > 0
    ? data.data[0].id
    : data?.data?.id;

  const handleSave = async () => {
    if (!rewardAmount) {
      ErrorToast("Please enter a reward amount");
      return;
    }

    if (!rewardId) {
      ErrorToast("Unable to identify referral reward record");
      return;
    }

    try {
      await updateReferralReward({ 
        id: rewardId, 
        rewardAmount: Number(rewardAmount) 
      }).unwrap();
      SuccessToast("Referral rewards updated successfully");
      setUserAmount(null); // Reset local state after success to sync with API again
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to update referral rewards");
    }
  };

  return (
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
              value={rewardAmount}
              onChange={(e) => setUserAmount(e.target.value)}
              className="pl-7"
              placeholder="10"
              disabled={isFetching}
            />
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <Button
            className="px-8 rounded-lg min-w-37.5"
            onClick={handleSave}
            disabled={isUpdating || isFetching}
          >
            {isUpdating ? "Saving..." : "Save Change"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralRewards;
