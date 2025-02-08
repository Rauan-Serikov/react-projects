import { useQuery } from "@tanstack/react-query";
import { fetchFavouriteMovies } from "../api/Movies";

const useFavorites = () => {
    return useQuery({
        queryKey: ['favorites'],
        queryFn: fetchFavouriteMovies,
    })
}

export default useFavorites;