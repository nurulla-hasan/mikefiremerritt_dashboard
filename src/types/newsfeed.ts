export interface INewsfeed {
  id: string;
  content: string;
  image?: string;
  video?: string;
  impressionCount: number;
  reachCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isPublished: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: "USER" | "TRAINER";
    image: string | null;
  };
}
