import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import { useSelector } from "react-redux";
import "./Movies.css";

function Movies() {
  const movies = useSelector((state) => state.reducer.movies);
  const listMovies = useSelector((state) => state.reducer.listMovies);
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movies__item" key={movie.imdbID}>
          <MovieItem
            {...movie}
            disabled={listMovies.find((item) => item.imdbID === movie.imdbID)}
          />
        </li>
      ))}
    </ul>
  );
}

export default Movies;
