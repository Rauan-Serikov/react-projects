import { useQuery } from "@tanstack/react-query";
import { Genre, getGenres } from "../api/Genre";

export const useGenres = () => {
    return useQuery<Genre>({
      queryKey: ['genres'], 
      queryFn: getGenres, 
    });
  };