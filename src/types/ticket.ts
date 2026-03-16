export type Ticket = {
  id: string;
  message: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  status: "OPEN" | "CLOSED";
  type: string;
  createdAt: string;
  updatedAt: string;
  reply: {
    id: string;
    message: string;
    status: string;
    createdAt: string;
  } | null;
};
