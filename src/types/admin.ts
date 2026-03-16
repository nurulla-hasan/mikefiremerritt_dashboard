export type TAdmin = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
};
