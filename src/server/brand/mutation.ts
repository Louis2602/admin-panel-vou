import { axiosInstance } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useActivateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axiosInstance.patch(`/brands/${id}/activate`),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error, id: string) => {
      await queryClient.invalidateQueries({ queryKey: ["brands"] });
      await queryClient.invalidateQueries({
        queryKey: ["brands", { id }],
      });
      toast.success("Brand activated successfully");
    },
  });
};

export const useDeactivateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axiosInstance.patch(`/brands/${id}/deactivate`),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error, id: string) => {
      await queryClient.invalidateQueries({ queryKey: ["brands"] });
      await queryClient.invalidateQueries({
        queryKey: ["brands", { id }],
      });
      toast.success("Brand deactivated successfully");
    },
  });
};
