import { axiosInstance } from "@/lib/api";
import { Notification } from "@/types/notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Get all notifications
export const useNotifications = (eventId?: string, isRead?: boolean) => {
  return useQuery({
    queryKey: ["notifications", { eventId, isRead }],
    queryFn: () =>
      axiosInstance
        .get<{
          data: Notification[];
        }>("/notification", { params: { eventId, isRead } })
        .then((res) => res.data.data),
  });
};

// Get a single notification
export const useNotification = (id: string) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: () =>
      axiosInstance
        .get<{ data: Notification }>(`/notification/${id}`)
        .then((res) => res.data.data),
  });
};

// Create a notification
export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createNotificationDTO: any) =>
      axiosInstance
        .post<{ data: Notification }>("/notification", createNotificationDTO)
        .then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

// Update a notification
export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updateNotificationDTO,
    }: {
      id: string;
      updateNotificationDTO: any;
    }) =>
      axiosInstance
        .patch<{
          data: Notification;
        }>(`/notification/${id}`, updateNotificationDTO)
        .then((res) => res.data.data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notification", variables.id],
      });
    },
  });
};

// Delete a notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      axiosInstance
        .delete<{ data: Notification }>(`/notification/${id}`)
        .then((res) => res.data.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.removeQueries({ queryKey: ["notification", id] });
    },
  });
};

// Mark a notification as read
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      axiosInstance
        .patch<{ data: Notification }>(`/notification/${id}/mark-as-read`)
        .then((res) => res.data.data),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notification", id] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      axiosInstance
        .patch<{ data: Notification[] }>("/notification/mark-all-as-read")
        .then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
