export type Notification = {
  id: string;
  userId: string;
  eventId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
};
