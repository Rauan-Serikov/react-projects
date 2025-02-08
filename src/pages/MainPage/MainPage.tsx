import { FC } from "react";
import { useRandomMovie } from "../../hooks/useRandomMovie";
import { MovieSection } from "../../ui/sections/ MovieSection/MovieSection";
import Top10MoviesSection from "../../ui/sections/Top10MoviesSection/Top10MoviesSection";

const MainPage: FC = () => {
    return (
        <>
            <MovieSection type="randomMovie" movie={useRandomMovie()} />
            <Top10MoviesSection />
        </>
    )
};

export default MainPage;