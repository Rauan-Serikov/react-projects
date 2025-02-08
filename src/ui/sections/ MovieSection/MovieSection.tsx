import { FC, useEffect, useState } from "react";
import "./MovieSection.css";
import { formatRuntime } from "../../../utils/formatRuntime";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { Movie } from "../../../api/Movies";
import Button from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import useUser from "../../../hooks/useUser";
import { addToFavorites, deleteFromFavorites } from "../../../api/User";
import { openModal } from "../../../state/modal/modalSlice";
import like from "../../../assets/like.svg";
import like_favorite from "../../../assets/like_favorite.svg";
import reload from "../../../assets/reload.svg";
import { Link } from "react-router-dom";

type RandomMovie = {
  type: "randomMovie";
  movie: UseQueryResult<Movie, Error>;
};

type MovieById = {
  type: "movieById";
  movie: UseQueryResult<Movie | null, Error>;
};

type TProps = RandomMovie | MovieById;

export const MovieSection: FC<TProps> = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading: isLoadingUser } = useSelector((state: RootState) => state.user);
  if (isLoadingUser) return null;
  const { data: movie, isLoading, refetch } = props.movie;


  const { data: user } = useUser();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && movie?.id) {
      setIsFavorite(user.favorites.includes(movie?.id.toString()));
    }
  }, [user, movie?.id]);

  const toggleFavoriteMutation = useMutation<void, Error, number>({
    mutationFn: async (id) => {
      if (isFavorite) {
        await deleteFromFavorites(id);
      } else {
        await addToFavorites(id.toString());
      }
    },
    onSuccess: () => {
      setIsFavorite((prev) => !prev);
    },
    onError: (error) => {
      console.error("Ошибка обновления избранного:", error);
    },
  });

  const handleToggleFavorite = (id: number) => {
    toggleFavoriteMutation.mutate(id);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleRefetch = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    refetch();
  };

  if (!movie) {
    return null;
  }

  return (
    <section className="movie">
      <div className="movie-info">
        <div className="movie-details">
          <span className="movie-details-item movie-details-item_rating">
            {movie.tmdbRating}
          </span>
          <span className="movie-details-item">{movie.releaseYear}</span>
          <span className="movie-details-item">{movie.genres[0]}</span>
          <span className="movie-details-item">
            {formatRuntime(movie.runtime)}
          </span>
        </div>
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-descr">{movie.plot}</p>
        <div className="movie-buttons-wrapper">
          <Button type="primary" children="Трейлер" />
          {props.type === "randomMovie" ? (
            <Link to={`/movies/${movie?.id}`}>
              <Button type="secondary" children="О фильме" />
            </Link>
          ) : null}

          {isAuthenticated ? (
            <Button
              onClick={() => {
                if (movie?.id) {
                  handleToggleFavorite(movie.id);
                }
              }}
              type="withIcon"
              children={
                isFavorite ? (
                  <img
                    className="movie-button-icon"
                    src={like_favorite}
                    alt="Like-favorite"
                  />
                ) : (
                  <img className="movie-button-icon" src={like} alt="Like" />
                )
              }
            />
          ) : (
            <Button
              onClick={() => dispatch(openModal({ type: "login" }))}
              type="withIcon"
              children={
                <img className="movie-button-icon" src={like} alt="Like" />
              }
            />
          )}
          {props.type === "randomMovie" ? (
            <Button
              type="withIcon"
              children={
                <img className="movie-button-icon" src={reload} alt="Like" />
              }
              onClick={handleRefetch}
            />
          ) : null}
        </div>
      </div>

      <div className="movie-image" style={{ backgroundImage: `url(${movie?.backdropUrl})` }}></div>
    </section>
  );
};
