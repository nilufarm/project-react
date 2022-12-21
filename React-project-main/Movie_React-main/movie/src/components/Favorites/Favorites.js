import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./Favorites.css";
import { removeListMovie, setLinkActive } from "../../redux/actions/actions";

function Favorites() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [listLink, setLinkList] = useState("#");
  const listMovies = useSelector((state) => state.reducer.listMovies);
  const linkActive = useSelector((state) => state.reducer.linkActive);
  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  const saveList = () => {
    dispatch(setLinkActive(true));
    axios
      .post("https://acb-api.algoritmika.org/api/movies/list", {
        title: title,
        movies: listMovies.map((item) => item.imdbID),
      })
      .then((res) => {
        setLinkList(res.data.id);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <div className="favorites">
      <input
        value={title}
        placeholder="Введите название списка"
        className="favorites__name"
        onChange={handleInput}
        disabled={linkActive}
      />
      <ul className="favorites__list">
        {listMovies.map((item) => {
          return (
            <li key={item.imdbID}>
              {item.Title} ({item.Year})
              <button
                disabled={linkActive}
                onClick={() => dispatch(removeListMovie(item.imdbID))}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={`favorites__save ${linkActive ? "link__none" : null}`}
        onClick={saveList}
        disabled={title === "" || listMovies.length === 0}
      >
        Сохранить список
      </button>
      <a
        href={`../list/${listLink}`}
        className={`link__none ${linkActive ? "link__block" : null}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Поделиться с друзьями
      </a>
    </div>
  );
}

export default Favorites;
