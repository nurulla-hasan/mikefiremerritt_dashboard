/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { CheckCircle2, MinusCircle, Plus, Loader2 } from "lucide-react";
import { 
  useUpdateSubscriptionPlanMutation, 
  useGetAllSubscriptionPlansQuery 
} from "@/redux/feature/pricing-rule/pricingRuleApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const StandardSubscriptionFeeContent = ({ plansData }: { plansData: any }) => {
  const initialPlan = plansData?.data?.find((plan: any) => plan.initialPlan === true);

  const [title, setTitle] = useState(initialPlan?.title || "");
  const [price, setPrice] = useState(initialPlan?.price?.toString() || "");
  const [features, setFeatures] = useState<string[]>(
    initialPlan?.description 
      ? initialPlan.description.split(", ").filter((f: string) => f.length > 0) 
      : []
  );
  const [newFeature, setNewFeature] = useState("");

  const [updatePlan, { isLoading: isUpdating }] = useUpdateSubscriptionPlanMutation();

  const handleAddFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((prev) => [...prev, trimmed]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!initialPlan?.id) return;

    // Smart logic: Check if there's any pending text in the input field
    const finalFeatures = [...features];
    const pendingFeature = newFeature.trim();
    
    if (pendingFeature && !finalFeatures.includes(pendingFeature)) {
      finalFeatures.push(pendingFeature);
      // Update UI state too for consistency
      setFeatures(finalFeatures);
      setNewFeature("");
    }

    const generatedDescription = finalFeatures.join(", ");

    const payload = {
      id: initialPlan.id,
      data: {
        title,
        description: generatedDescription,
        currency: "usd",
        duration: "MONTHLY",
        price: Number(price),
      },
    };

    try {
      await updatePlan(payload).unwrap();
      SuccessToast("Subscription plan updated successfully");
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to update plan");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-crimson text-2xl">
          Standard Subscription Plan
        </CardTitle>
        <CardDescription>
          Update the base subscription details for trainers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Plan Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Trainer (Pro)"
              className="bg-background border-muted-foreground/20"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Price (USD / Monthly)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                value={price}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setPrice(val);
                  }
                }}
                className="pl-7 bg-background border-muted-foreground/20 focus:border-primary/50"
                placeholder="45.99"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="font-semibold text-lg font-crimson">
            Plan Features
          </h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveFeature(index)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add new feature..."
              className="bg-background border-muted-foreground/20"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddFeature}
              className="border-dashed border-2 border-muted-foreground/30 hover:border-primary hover:text-primary"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center pt-6 border-t">
          <Button 
            className="px-12 min-w-50"
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const StandardSubscriptionFee = () => {
  // Fetch all plans
  const { data: plansData, isLoading: isFetchingPlans } = useGetAllSubscriptionPlansQuery(undefined);

  if (isFetchingPlans) {
    return (
      <Card className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

  // Find the initial plan once
  const initialPlan = plansData?.data?.find((plan: any) => plan.initialPlan === true);

  if (!initialPlan) {
    return (
      <Card className="flex items-center justify-center p-12">
        <p className="text-muted-foreground">No standard plan found.</p>
      </Card>
    );
  }

  // Use the plan's unique ID as a key to reset the inner component's state automatically
  return <StandardSubscriptionFeeContent key={initialPlan.id} plansData={plansData} />;
};

export default StandardSubscriptionFee;
