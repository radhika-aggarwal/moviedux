import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, watchlist, toggleWatchlist }) {
  const [searchTerm, setsearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genre");
  const [rating, setRating] = useState("All");
  const handleSearch = (e) => {
    setsearchTerm(e.target.value);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genre" || movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesRating = (movie, rating) => {
    if (rating === "All") return true;
    if (rating === "Good") return movie.rating >= 8;
    if (rating === "Ok") return movie.rating >= 5 && movie.rating < 8;
    if (rating === "Bad") return movie.rating < 5;
    return false;
  };

  const matchesSearch = (movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
  const filteredMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearch(movie)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label> Genre </label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option> All Genre </option>
            <option> Drama</option>
            <option> Horror</option>
            <option> Fantasy</option>
          </select>
        </div>
        <div className="filter-slot">
          <label> Rating </label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option> All </option>
            <option> Good</option>
            <option> Ok</option>
            <option> Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            toggleWatchlist={toggleWatchlist}
            isWatchlisted={watchlist.includes(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
