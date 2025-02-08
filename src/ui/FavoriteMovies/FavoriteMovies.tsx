import "./FavoriteMovies.css";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteFromFavorites } from "../../api/User";
import useFavorites from "../../hooks/useFavorites";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { FC } from "react";

const FavoriteMovies: FC = () => {
    const { data: movies, isLoading: moviesLoading, error: moviesError, refetch: moviesRefetch } = useFavorites();

    const deleteFromFavoritesMutation = useMutation<void, Error, number>({
        mutationFn: deleteFromFavorites,
        onError: (error) => {
            console.error("Error deleting from favorites:", error);
        },
        onSuccess: () => {
            moviesRefetch()
        },
    });

    const handleDeleteFromFavorites = (id: number) => {
        deleteFromFavoritesMutation.mutate(id);
    };

    if (moviesLoading) {
        return <p>Loading...</p>;
    }

    return (
        <section className="favorites">
            <ul className="favorite-movies-list">
                {movies ? (movies.length > 0 ? (
                    movies?.map((movie) => (
                        <li className="favorite-movie-item" key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>
                                <Card type="favorites" backgroundImg={movie.posterUrl} />
                            </Link>

                            <Button type="x" onClick={() => handleDeleteFromFavorites(movie.id)} />
                        </li>

                    ))
                ) : (
                    <p>У вас пока нет избранных фильмов.</p>
                )) : (
                    <div>
                        <span>{moviesError?.message}</span>
                        <Button
                            type="primary"
                            onClick={() => {
                                moviesRefetch();
                            }}
                        >
                            Повторить запрос
                        </Button>
                    </div>)}
            </ul>
        </section>
    );
};

export default FavoriteMovies;
