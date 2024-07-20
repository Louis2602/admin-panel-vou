import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const usePromotions = () => {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: () =>
      axiosInstance.get("/promotions").then((res) => res.data.data),
  });
};
