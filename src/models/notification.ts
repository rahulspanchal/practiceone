/** Domain model for an in-app notification. */
export interface AppNotification {
  id: string;
  title: string;
  body: string;
  /** Epoch milliseconds. */
  createdAt: number;
  read: boolean;
}
