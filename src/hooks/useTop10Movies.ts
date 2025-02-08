import { useQuery } from "@tanstack/react-query";
import { getTop10Moives, MovieList } from "../api/Movies";

export const useTop10Movies = () => {
  return useQuery<MovieList>({
    queryKey: ['top10Movies'],
    queryFn: getTop10Moives,
  });
};