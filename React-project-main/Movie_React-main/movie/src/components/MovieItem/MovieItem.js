import React from "react";
import "./MovieItem.css";
import { useDispatch, useSelector } from "react-redux";
import { addListMovie } from "../../redux/actions/actions";

function MovieItem({ Title, Year, Poster, imdbID, disabled }) {
  const dispatch = useDispatch();
  const linkActive = useSelector((state) => state.reducer.linkActive);
  return (
    <article className="movie-item">
      <img className="movie-item__poster" src={Poster} alt={Title} />
      <div className="movie-item__info">
        <h3 className="movie-item__title">
          {Title}&nbsp;({Year})
        </h3>
        <button
          type="button"
          className="movie-item__add-button"
          onClick={() => dispatch(addListMovie(imdbID))}
          disabled={disabled || linkActive}
        >
          Добавить в список
        </button>
      </div>
    </article>
  );
}

export default MovieItem;
