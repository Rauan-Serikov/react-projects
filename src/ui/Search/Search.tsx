import "./Search.css";
import { useState } from "react";
import SearchSuggests from "../SearchSuggests/SearchSuggests";
import { useMovies } from "../../hooks/useMovies";

const Search = ({ onFocus, onBlur }: { onFocus: () => void; onBlur: () => void }) => {
  const { data: movies } = useMovies();
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredMovies = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const shouldShowSuggestions =
    searchInput && filteredMovies && filteredMovies.length > 0;

  return (
    <div className="search">
      <div className="search-wrapper">
        <svg className="search-icon" width="21" height="21" viewBox="0 0 21 21" fill="none">
          <path d="M16.3591 14.6168L20.6418 18.8995L19.2276 20.3137L14.9449 16.031C13.405 17.263 11.4521 18 9.32812 18C4.36013 18 0.328125 13.968 0.328125 9C0.328125 4.032 4.36013 0 9.32812 0C14.2961 0 18.3281 4.032 18.3281 9C18.3281 11.124 17.5911 13.0769 16.3591 14.6168ZM14.3528 13.8748C15.5756 12.6146 16.3281 10.8956 16.3281 9C16.3281 5.1325 13.1956 2 9.32812 2C5.46062 2 2.32812 5.1325 2.32812 9C2.32812 12.8675 5.46062 16 9.32812 16C11.2237 16 12.9427 15.2475 14.2029 14.0247L14.3528 13.8748Z" />
        </svg>

        <input
          type="text"
          placeholder="Поиск"
          className="search-input"
          value={searchInput}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      {shouldShowSuggestions && (
        <div
          className="search-suggests-wrapper"
          onMouseDown={(e) => e.preventDefault()}
        >
          <SearchSuggests movies={filteredMovies} />
        </div>
      )}
    </div>
  );
};

export default Search;
