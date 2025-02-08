import { useQuery } from "@tanstack/react-query";
import { getMovieById, getTop10Moives, Movie } from "../api/Movies";

export const useMovieById = (movieId: number | null) => {
  return useQuery<Movie, Error>({
    queryKey: ['movieById', movieId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      if (typeof id !== 'number') {
        throw new Error('Movie ID must be a number');
      }
      return getMovieById(id);
    },
    enabled: movieId !== null,
  });
};

export const useTop10MovieById = (movieId: number | null) => {
  return useQuery<Movie | null, Error>({
    queryKey: ['top10movieById', movieId],
    queryFn: async () => {
      if (movieId === null) {
        throw new Error('Movie ID is required for top 10 movies');
      }
      const movieList = await getTop10Moives();
      return movieList.find((movie) => movie.id === movieId) || null;
    },
    enabled: movieId !== null,
  });
};
