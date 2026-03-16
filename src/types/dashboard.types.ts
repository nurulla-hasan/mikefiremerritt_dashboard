export interface IEarningGrowth {
  label: string;
  total: number;
}

export interface IUserGrowthByMonth {
  month: string;
  role: "MEMBER" | "TRAINER";
  count: number;
}

export interface IDashboardStats {
  totalUsers: number;
  totalTrainers: number;
  totalProducts: number;
  totalEarnings: number;
  earningGrowth: IEarningGrowth[];
  userGrowthByMonth: IUserGrowthByMonth[];
}

export interface IDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IDashboardStats;
}
