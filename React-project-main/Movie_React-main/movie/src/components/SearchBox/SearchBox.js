import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovies, getMovies } from "../../redux/actions/actions";
import "./SearchBox.css";

function SearchBox() {
  const [searchLine, setSearchLine] = useState("");

  const searchLineChangeHandler = (e) => {
    setSearchLine(e.target.value);
  };
  const searchBoxSubmitHandler = (e) => {
    e.preventDefault();
  };

  const dispatch = useDispatch();
  return (
    <div className="search-box">
      <form className="search-box__form" onSubmit={searchBoxSubmitHandler}>
        <label className="search-box__form-label">
          Искать фильм по названию:
          <input
            value={searchLine}
            type="text"
            className="search-box__form-input"
            placeholder="Например, Shawshank Redemption"
            onChange={searchLineChangeHandler}
          />
        </label>
        <button
          type="submit"
          className="search-box__form-submit"
          onClick={() =>
            getMovies(searchLine)
              .then((res) => dispatch(addMovies(res)))
              .catch((err) => {
                dispatch(addMovies([]));
                return err;
              })
          }
          disabled={!searchLine}
        >
          Искать
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
