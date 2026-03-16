export interface IUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: "ACTIVE" | "BLOCKED" | "PENDING";
  role: "MEMBER" | "TRAINER";
  bio: string | null;
  image: string | null;
  fitnessGoals: string[];
  address: string | null;
  createdAt: string;
}
