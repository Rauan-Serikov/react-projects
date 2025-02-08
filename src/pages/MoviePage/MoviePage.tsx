import "./MoviePage.css";
import { FC } from "react";
import { useMovieById, useTop10MovieById } from "../../hooks/useMovieById";
import { MovieSection } from "../../ui/sections/ MovieSection/MovieSection";
import { useParams } from "react-router-dom";

type MoviePage = {
  type?: "movie";
};

const MoviePage: FC<MoviePage> = ({ type }) => {
  const { movieId } = useParams();

  const movieIdNumber = movieId ? parseInt(movieId, 10) : null;
  const movieData =
    type === "movie"
      ? useMovieById(movieIdNumber)
      : useTop10MovieById(movieIdNumber);

  return (
    <div className="movie-page">
      <MovieSection type="movieById" movie={movieData} />

      <section className="about-movie">
        <h2 className="about-movie-title">О фильме</h2>

        <div className="about-movie-container">
          <div className="about-movie-wrapper">
            <span className="about-movie-key">Язык оригинала</span>
            <span className="dots"></span>
            <span className="about-movie-value">{movieData.data?.language}</span>
          </div>

          <div className="about-movie-wrapper">
            <span className="about-movie-key">Бюджет</span>
            <span className="dots"></span>
            <span className="about-movie-value">{movieData.data?.budget}</span>
          </div>

          <div className="about-movie-wrapper">
            <span className="about-movie-key">Выручка</span>
            <span className="dots"></span>
            <span className="about-movie-value">{movieData.data?.revenue}</span>
          </div>

          <div className="about-movie-wrapper">
            <span className="about-movie-key">Режиссёр</span>
            <span className="dots"></span>
            <span className="about-movie-value">{movieData.data?.director}</span>
          </div>

          <div className="about-movie-wrapper">
            <span className="about-movie-key">Продакшен</span>
            <span className="dots"></span>
            <span className="about-movie-value">
              {movieData.data?.production}
            </span>
          </div>

          <div className="about-movie-wrapper">
            <span className="about-movie-key">Награды</span>
            <span className="dots"></span>
            <span className="about-movie-value">
              {movieData.data?.awardsSummary}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviePage;