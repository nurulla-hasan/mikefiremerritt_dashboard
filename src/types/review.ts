export type TReview = {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
    image: string;
  };
};
