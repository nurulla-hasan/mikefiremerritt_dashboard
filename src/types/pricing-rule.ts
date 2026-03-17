/* eslint-disable @typescript-eslint/no-explicit-any */
export type TPricingRuleType = "FIRST_COME" | "TIME_BASED" | "REFERRAL_MILESTONE" | "VOLUME_DISCOUNT";

export type TPricingRule = {
  id: string;
  userId: string;
  subscriptionOfferId: string;
  name: string;
  type: TPricingRuleType;
  discountPercent: number | null;
  discountAmount: number | null;
  maxSubscribers: number | null;
  usageCount: number;
  stripeCouponId: string;
  startDate: string;
  endDate: string;
  durationMonths: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  subscriptionOffer: {
    id: string;
    title: string;
    price: number;
    planType: string;
    duration: string;
  };
  subscriptionPricingRuleTrainers: any[];
  usages: {
    id: string;
    userId: string;
    createdAt: string;
  }[];
  remainingSlots: number | null;
  trainers: any[];
};
