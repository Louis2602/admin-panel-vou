import { axiosInstance } from "@/lib/api";
import { Game } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export const useGames = (type: string) => {
  return useQuery({
    queryKey: ["games", type],
    queryFn: () =>
      axiosInstance.get<Game[]>(`/games?type=${type}`).then((res) => {
        return res.data;
      }),
  });
};

export const useGame = (id: string) => {
  return useQuery({
    queryKey: ["games", id],
    queryFn: () =>
      axiosInstance.get<Game>(`/games/${id}`).then((res) => res.data),
  });
};
