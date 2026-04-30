/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetReferralRewardQuery, useUpdateReferralRewardMutation } from "@/redux/feature/referrals/referralApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";

const ReferralRewards = () => {
  const [amount, setAmount] = useState<string>("");
  const { data, isLoading: isFetching } = useGetReferralRewardQuery(undefined);
  const [updateReferralReward, { isLoading: isUpdating }] = useUpdateReferralRewardMutation();
  const hasInitialized = useRef(false);

  // Set rewardAmount from API to input when data loads (only once)
   
  useEffect(() => {
    if (!hasInitialized.current && data?.data) {
      if (Array.isArray(data.data) && data.data.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAmount(data.data[0].rewardAmount?.toString() || "");
        hasInitialized.current = true;
      } else if (data.data?.rewardAmount) {
         
        setAmount(data.data.rewardAmount.toString());
        hasInitialized.current = true;
      }
    }
  }, [data]);

  const rewardId = data?.data && Array.isArray(data.data) && data.data.length > 0
    ? data.data[0].id
    : data?.data?.id;

  const handleSave = async () => {
    if (!amount || Number(amount) <= 0) {
      ErrorToast("Please enter a valid amount greater than 0");
      return;
    }

    try {
      await updateReferralReward({ 
        id: rewardId, 
        rewardAmount: Number(amount) 
      }).unwrap();
      SuccessToast("Referral rewards updated successfully");
      setAmount(amount);
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
