import { axiosInstance } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateGameStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      axiosInstance.patch(`/games/${id}/status`, { status }),
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      toast.error("An error occurred: " + errorMessage);
    },
    onSettled: async (_, __, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ["games"] });
      await queryClient.invalidateQueries({
        queryKey: ["games", { id }],
      });
      toast.success("Game status updated successfully");
    },
  });
};
