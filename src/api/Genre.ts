import { z } from 'zod'

const API_URL = 'https://cinemaguide.skillbox.cc'

export const GenreSchema = z.array(z.string());

export type Genre = z.infer<typeof GenreSchema>;

export const getGenres = async (): Promise<Genre> => {
    return await fetch(`${API_URL}/movie/genres`)
        .then((response) => response.json())
        .then((data) => GenreSchema.parse(data));
};
