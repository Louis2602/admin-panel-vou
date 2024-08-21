import { axiosInstance } from "@/lib/api";
import { UpdatedUser } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatedUser }) =>
      axiosInstance.patch(`/users/${id}`, data),
    onError: (error) => {
      toast.error("An error occurred: " + (error as Error).message);
    },
    onSettled: async (_, __, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({
        queryKey: ["users", { id: variables.id }],
      });
      toast.success("Update user successfully");
    },
  });
};
