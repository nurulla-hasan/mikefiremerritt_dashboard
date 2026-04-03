export interface ISpecialty {
  id: string;
  specialtyName: string;
}

export interface IServiceType {
  id: string;
  serviceName: string;
}

export interface ITrainer {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  image?: string | null;
  status: "ACTIVE" | "BLOCKED";
  isProfileComplete: boolean;
  specialtyId: string | null;
  portfolio: string[];
  certifications: string[];
  orgName: string | null;
  credentialNo: string | null;
  experienceYears: number;
  viewCount: number;
  specialty: ISpecialty[];
  serviceTypes: IServiceType[];
  totalRevenue?: number;
  subscription?: {
    isSubscribed: boolean;
    plan: string;
    subscriptionEnd: string;
  };
  createdAt: string;
  updatedAt: string;
}
