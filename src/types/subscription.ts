export type TSubscriptionOffer = {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  initialPlan: boolean;
  currency: string;
  duration: "MONTHLY" | "YEARLY";
  planType: string;
  status: "ACTIVE" | "INACTIVE";
  stripeProductId: string;
  stripePriceId: string;
  createdAt: string;
  updatedAt: string;
};

export type TTrainerInfo = {
  name: string;
  image: string | null;
  email: string;
  totalReferrals: number;
};

export type TSubscription = {
  id: string;
  userId: string;
  subscriptionOfferId: string;
  productId: string | null;
  startDate: string;
  endDate: string;
  stripeSubscriptionId: string;
  paymentStatus: "COMPLETED" | "CANCELLED" | "REFUNDED" | "PENDING";
  createdAt: string;
  updatedAt: string;
  subscriptionOffer: TSubscriptionOffer;
  trainerInfo: TTrainerInfo;
  subscriptionState: "active" | "expired";
};
