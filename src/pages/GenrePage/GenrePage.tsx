import { FC, useState } from "react";
import "./GenrePage.css";
import Button from "../../ui/Button/Button";
import { Link, useParams } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import Card from "../../ui/Card/Card";

const GenrePage: FC = () => {
  const { genre } = useParams();
  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
    refetch: moviesRefetch,
  } = useMovies();
  const [visibleCount, setVisibleCount] = useState(15);

  if (moviesLoading) {
    return <p>Loading...</p>;
  }

  if (moviesError) {
    return (
      <div>
        <span>Произошла ошибка :(</span>
        <Button
          type="primary"
          children="Повторить запрос"
          onClick={() => {
            moviesRefetch();
          }}
        />
      </div>
    );
  }

  if (!genre) {
    return <p>Жанр не найден.</p>;
  }

  const filteredMovies =
    movies?.filter((movie) => movie.genres?.includes(genre)) || [];
  const visibleMovies = filteredMovies?.slice(0, visibleCount);

  return (
    <section className="genre">
      <h1 className="genre-title">{genre}</h1>
      <ul className="movies-list">
        {visibleMovies?.map((movie) => (
          <li key={movie.id} className="movie-item">
            <Link
              to={`/movies/${movie.id}`}
            >
              <Card
                type="favorites"
                value={movie.title}
                backgroundImg={movie.posterUrl}
              />
            </Link>
          </li>
        ))}
      </ul>
      {visibleCount < filteredMovies?.length && (
        <Button
          type="primary"
          children="Показать еще"
          onClick={() => setVisibleCount(visibleCount + 15)}
        />
      )}
    </section>
  );
};

export default GenrePage;
