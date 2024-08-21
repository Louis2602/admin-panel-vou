import { axiosInstance } from "@/lib/api";
import { Brand } from "@/types/brand";
import { useQuery } from "@tanstack/react-query";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => axiosInstance.get("/users").then((res) => res.data.data),
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      axiosInstance
        .get<{
          data: Brand[];
        }>("/brands")
        .then((res) => res.data.data),
  });
};

export const useBrand = (id: string) => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      axiosInstance
        .get<{
          data: Brand;
        }>(`/brands/${id}`)
        .then((res) => res.data?.data),
  });
};
