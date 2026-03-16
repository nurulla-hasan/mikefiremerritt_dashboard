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

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
