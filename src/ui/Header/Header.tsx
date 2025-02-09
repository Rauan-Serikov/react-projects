import { FC, useState, useEffect, useRef } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import logo_icon from "../../assets/logo.svg";
import logo_title from "../../assets/маруся.svg";
import genres_mobile from "../../assets/genres_mobile.svg";
import search_mobile from "../../assets/search_mobile.svg";
import user_mobile from "../../assets/user_mobile.svg";
import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import { openModal } from "../../state/modal/modalSlice";
import Button from "../Button/Button";

const Header: FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, name } = useSelector((state: RootState) => state.user);

  const [isSearchVisible, setSearchVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const closeSearch = (e: MouseEvent) => {
    if (searchButtonRef.current && searchButtonRef.current.contains(e.target as Node)) {
      return;
    }

    if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeSearch);
    return () => {
      document.removeEventListener("click", closeSearch);
    };
  }, []);

  if (isLoading) return null;

  return (
    <nav className="nav">
      <NavLink className="nav-logo" to="/">
        <img className="nav-logo-icon" src={logo_icon} alt="logo_icon" />
        <img className="nav-logo-title" src={logo_title} alt="logo_title" />
      </NavLink>

      <NavLink className="nav-item" to="/">Главная</NavLink>
      <NavLink className="nav-item" to="/genres">Жанры</NavLink>

      <div className={`search-container ${isSearchVisible ? "visible" : ""}`} ref={searchContainerRef}>
        <Search
          onFocus={() => setSearchVisible(true)}
          onBlur={() => setSearchVisible(false)}
        />
      </div>

      <NavLink className="nav-item nav-item_mobile" to="/genres">
        <img src={genres_mobile} alt="" />
      </NavLink>

      <Button
        type="mobile-icon"
        onClick={() => setSearchVisible(!isSearchVisible)}
        ref={searchButtonRef}
      >
        <img src={search_mobile} alt="search" />
      </Button>

      {isAuthenticated ? (
        <div className="isAuthenticatedContainer">
          <NavLink className="nav-item" to="/profile">{name}</NavLink>
          <NavLink className="nav-item nav-item_mobile" to="/profile">
            <img src={user_mobile} alt="profile" />
          </NavLink>
        </div>
      ) : (
        <div className="isAuthenticatedContainer">
          <Button type="primary" onClick={() => dispatch(openModal({ type: "login" }))}>
            Войти
          </Button>
          <Button type="mobile-icon" onClick={() => dispatch(openModal({ type: "login" }))}>
            <img src={user_mobile} alt="login" />
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
