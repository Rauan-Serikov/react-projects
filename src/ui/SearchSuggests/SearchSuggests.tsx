import { FC } from "react";
import "./SearchSuggests.css"
import { Link } from "react-router";
import { formatRuntime } from "../../utils/formatRuntime";
import { MovieList } from "../../api/Movies";

interface SearchSuggestsProps {
    movies: MovieList;
}

const SearchSuggests: FC<SearchSuggestsProps> = ({ movies }) => {
    return (
        <div className="searchSuggests-list">
            {movies.map((movie) => (
                <Link to={`/movies/${movie.id}`} className="searchSuggests-item" key={movie.id} >
                    <div className="searchSuggests-wrapper searchSuggests-wrapper_left">
                        {movie.posterUrl && (
                            <img className="searchSuggests-image" src={movie.posterUrl} alt="" />
                        )}
                    </div>

                    <div className="searchSuggests-wrapper searchSuggests-wrapper_right">
                        <div className="searchSuggests-wrapper searchSuggests-wrapper_right_top">
                            <span className="searchSuggests-info searchSuggests-info_rating">{movie.tmdbRating}</span>

                            <span className="searchSuggests-info">{movie.releaseYear}</span>

                            <span className="searchSuggests-info">{movie.genres[0]}</span>

                            <span className="searchSuggests-info">{formatRuntime(movie.runtime)}</span>
                        </div>

                        <div className="searchSuggests-wrapper searchSuggests-wrapper_right_bottom">{movie.title}</div>
                    </div>
                </Link>
            ))}

        </div>
    )
}

export default SearchSuggests;