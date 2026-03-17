import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ReferralRewardsProps {
  referralAmount: string;
  setReferralAmount: (value: string) => void;
}

const ReferralRewards = ({
  referralAmount,
  setReferralAmount,
}: ReferralRewardsProps) => {
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
  );
};

export default ReferralRewards;
