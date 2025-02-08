import { FC } from "react";
import { useGenres } from "../../hooks/useGenres";
import { useMovies } from "../../hooks/useMovies";
import { Movie } from "../../api/Movies";
import "./GenresListPage.css";
import { Link } from "react-router-dom";
import Card from "../../ui/Card/Card";

const GenresListPage: FC = () => {
  const {
    data: genres,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();
  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useMovies();

  if (genresLoading || moviesLoading) {
    return <p>Loading...</p>;
  }

  if (genresError || moviesError) {
    return <p>Error loading data.</p>;
  }

  const usedMovies = new Set<number>();

  return (
    <section className="genres">
      <h1 className="genres-title">Жанры фильмов</h1>
      <ul className="genres-list">
        {genres?.map((genre: string) => {
          const movieWithGenre = movies?.find(
            (movie: Movie) =>
              movie.genres.includes(genre) &&
              movie.backdropUrl &&
              !usedMovies.has(movie.id)
          );

          if (movieWithGenre) {
            usedMovies.add(movieWithGenre.id);
            return (
              <li key={genre} className="genres-item">
                <Link to={`/genres/${genre}`} key={genre} className="genre-card">
                  <Card
                    type="genre"
                    value={genre}
                    backgroundImg={movieWithGenre.backdropUrl || undefined}
                  />
                </Link>
              </li>
            );
          }
          return (
            <li key={genre} className="genres-item">
              <Link to={`/genres/${genre}`} key={genre} className="genre-card">
                <Card
                  type="genre"
                  value={genre}
                  backgroundImg="placeholder-image-url"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default GenresListPage;
