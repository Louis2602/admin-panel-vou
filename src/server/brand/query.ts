import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axiosInstance.get("/admin/get-employees").then((res) => res.data.data),
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => axiosInstance.get("/brands").then((res) => res.data.data),
  });
};
