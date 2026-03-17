import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MinusCircle, Plus } from "lucide-react";

interface StandardSubscriptionFeeProps {
  standardFee: string;
  setStandardFee: (value: string) => void;
}

const StandardSubscriptionFee = ({
  standardFee,
  setStandardFee,
}: StandardSubscriptionFeeProps) => {
  const [subscriptionFeatures] = useState([
    "Verified badge",
    "Custom profile & products",
    "Client management tools",
    "Analytics & insights",
    "Priority support",
  ]);

  return (
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
  );
};

export default StandardSubscriptionFee;
