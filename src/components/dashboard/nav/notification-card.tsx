import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
} from "@/server/notification/query";
import { Notification } from "@/types/notification";

export const NotificationCard = ({
  notifications,
  isLoading,
}: {
  notifications: Notification[] | undefined;
  isLoading: boolean;
}) => {
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const markAsRead = useMarkNotificationAsRead();

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate();
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead.mutate(id);
  };

  if (notifications === undefined || isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  // Filter unread notifications
  const unreadNotifications =
    notifications?.filter((notification) => !notification.isRead) || [];

  return (
    <div className="space-y-4">
      {unreadNotifications.length === 0 ? (
        <p className="text-center text-gray-500">No new notifications</p>
      ) : (
        <>
          <div className="space-y-2">
            {unreadNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-4 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div className="flex-shrink-0 mt-1">
                  <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                </div>
                <div className="flex-grow">
                  <Link
                    href={`/dashboard/notifications/${notification.id}`}
                    className="block"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMarkAsRead(notification.id)}
                  disabled={markAsRead.isPending}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            className="w-full"
            onClick={handleMarkAllAsRead}
            disabled={markAllAsRead.isPending}
          >
            <Check className="mr-2 h-4 w-4" />
            {markAllAsRead.isPending
              ? "Marking all as read..."
              : "Mark all as read"}
          </Button>
        </>
      )}
    </div>
  );
};
