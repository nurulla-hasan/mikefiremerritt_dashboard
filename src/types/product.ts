export interface IProductTrainer {
  trainerId: string;
  trainerName: string;
  trainerEmail: string;
  trainerImage: string | null;
  organizationName: string | null;
  experienceYears: number;
  specialty: {
    id: string;
    specialtyName: string;
  }[];
}

export interface IProduct {
  id: string;
  productName: string;
  productStatus: "ACTIVE" | "INACTIVE";
  status: "ACTIVE" | "INACTIVE";
  description: string;
  durationWeeks: number;
  bulletPoints: string[];
  totalPurchased: number;
  views: number;
  price: number;
  capacity: number;
  avgRating: number;
  ratingCount: number;
  productImage: string | null;
  productVideo: string | null;
  agreementPdf: string | null;
  isActive: boolean;
  isApprovedByTrainer: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  trainer: IProductTrainer;
}
