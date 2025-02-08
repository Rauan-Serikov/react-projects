import { useQuery } from "@tanstack/react-query";
import { getRandomMovie, Movie } from "../api/Movies";

export const useRandomMovie = () => {
  return useQuery<Movie>({
    queryKey: ['randomMovie'],
    queryFn: getRandomMovie,
  });
};