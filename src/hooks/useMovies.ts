import { useQuery } from "@tanstack/react-query";
import { getMoivesList, MovieList } from "../api/Movies";

export const useMovies = () => {
  return useQuery<MovieList>({
    queryKey: ['moviesList'],
    queryFn: getMoivesList,
  });
};