import { z } from 'zod'

const API_URL = 'https://cinemaguide.skillbox.cc'


export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number().optional(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  budget: z.union([z.string(), z.null()]).optional(),
  revenue: z.union([z.string(), z.null()]).optional(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string().nullable(),
  backdropUrl: z.union([z.string(), z.null()]).optional(),
  trailerUrl: z.string(),
  trailerYoutubeId: z.union([z.string(), z.null()]).optional(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.union([z.string(), z.null()]).optional(),
  production: z.union([z.string(), z.null()]).optional(),
  awardsSummary: z.union([z.string(), z.null()]).optional(),
});

export type Movie = z.infer<typeof MovieSchema>

export const MovieList = z.array(MovieSchema)
export type MovieList = z.infer<typeof MovieList>

export const FetchMovieListSchema = z.object({
  list: MovieList
})
export type FetchMovieListResponse = z.infer<typeof FetchMovieListSchema>

export const getMoivesList = async (): Promise<MovieList> => {
  return await fetch(`${API_URL}/movie`)
    .then((response) => response.json())
    .then((data) => MovieList.parse(data));
};

export const getTop10Moives = async (): Promise<MovieList> => {
  return await fetch(`${API_URL}/movie/top10`)
    .then((response) => response.json())
    .then((data) => MovieList.parse(data))
}

export const getRandomMovie = async (): Promise<Movie> => {
  return await fetch(`${API_URL}/movie/random`)
    .then((response) => response.json())
    .then((data) => MovieSchema.parse(data))
}

export const getMovieById = async (movieId: number): Promise<Movie> => {
  return await fetch(`${API_URL}/movie/${movieId}`)
    .then((response) => response.json())
    .then((data) => MovieSchema.parse(data))
}

export function fetchFavouriteMovies(): Promise<MovieList> {
  return fetch(`${API_URL}/favorites`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data);
      return MovieList.parse(data);
    })
    .catch((error) => {
      console.error("Error parsing data:", error);
      throw error;
    });
}