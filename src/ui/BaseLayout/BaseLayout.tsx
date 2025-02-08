import "./BaseLayout.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import FavoriteMovies from "../FavoriteMovies/FavoriteMovies";
import UserSettings from "../UserSettings/UserSettings";
import Modal from "../Modal/Modal";
import { FC, Suspense, lazy } from "react";

const LazyMainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const LazyGenresListPage = lazy(() => import('../../pages/GenresListPage/GenresListPage'));
const LazyGenrePage = lazy(() => import('../../pages/GenrePage/GenrePage'));
const LazyMoviePage = lazy(() => import('../../pages/MoviePage/MoviePage'));
const LazyUserPage = lazy(() => import('../../pages/UserPage/UserPage'));

const BaseLayout: FC = () => {
  return (
    <div className="layout">
      <Header />

      <Suspense fallback = {<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<LazyMainPage />} />
          <Route path="/genres" element={<LazyGenresListPage />} />
          <Route path="/genres/:genre" element={<LazyGenrePage />} />
          <Route path="/movies/:movieId" element={<LazyMoviePage type="movie" />} />
          <Route path="/profile/*" element={<LazyUserPage />}>
            <Route path="" element={<Navigate to="favorites" replace />} />
            <Route path="favorites" element={<FavoriteMovies />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
        </Routes>
      </Suspense>

      <Modal />

      <Footer />
    </div>
  );
};

export default BaseLayout;
