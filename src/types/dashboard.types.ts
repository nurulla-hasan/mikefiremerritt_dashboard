export interface IEarningGrowth {
  label: string;
  total: number;
}

export interface IUserGrowthByMonth {
  month: string;
  role: "MEMBER" | "TRAINER";
  count: number;
}

export interface IProductStats {
  purchasable: number;
  nonPurchasable: number;
  message?: string;
}

export interface IDashboardStats {
  totalUsers: number;
  totalTrainers: number;
  productStats: IProductStats;
  totalEarnings: number;
  totalVisitors: number;
  earningGrowth: IEarningGrowth[];
  userGrowthByMonth: IUserGrowthByMonth[];
}

export interface IDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IDashboardStats;
}
