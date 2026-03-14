export interface IUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  image: string | null;
  bio: string;
  fitnessGoals: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socialAccounts: any[];
  createdAt: string;
  updatedAt: string;
}
