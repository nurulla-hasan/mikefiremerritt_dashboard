/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  data: any | null;
  isRead: boolean;
  isClicked: boolean;
  createdAt: string;
  updatedAt: string;
}
