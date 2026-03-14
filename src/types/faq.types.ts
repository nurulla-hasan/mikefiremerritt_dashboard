export interface TFaq {
  id: string;
  userId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface TFaqResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TFaq[];
}
