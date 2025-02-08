import { FC } from "react";
import { useTop10Movies } from "../../../hooks/useTop10Movies";
import "./Top10MoviesSection.css";
import { Link } from "react-router-dom";
import Card from "../../Card/Card";

const Top10MoviesSection: FC = () => {
  const { data: moviesList, isLoading } = useTop10Movies();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="top10-movies">
      <h2 className="top10-movies-title">Top 10 Movies</h2>
      <ul className="top10-movies-list">
        {moviesList?.map((movie, index) => (
          <li className="top10-movies-item" key={movie.id}>
            <Link to={`/movies/${movie?.id}`}>
              <Card
                type="rating"
                value={index + 1}
                backgroundImg={movie.posterUrl}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Top10MoviesSection;
