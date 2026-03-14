export type TDecodedToken = {
  id: string;
  email: string;
  role: string;
  purpose: string;
  iat: number;
  exp: number;
};

export type TError = {
  data?: {
    message?: string;
    stack?: string;
    success?: boolean;
  };
  status?: number;
  message?: string;
};
