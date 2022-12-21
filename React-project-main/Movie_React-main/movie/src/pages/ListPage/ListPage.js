import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostMovies } from "../../redux/actions/actions";
import "./ListPage.css";

function ListPage() {
  const [title, setTitle] = useState("");
  const {id} = useParams();
  // const id = props.match.params.id;
  const movies = useSelector((state) => state.reducer.postMovies);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setTitle(data.title);
        data.movies.forEach((imdbID) => dispatch(getPostMovies(imdbID)));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="list-page">
      <h1 className="list-page__title">{title}</h1>
      <ul>
        {movies.map((item) => (
          <li key={item[0].imdbID}>
            <a
              href={"https://www.imdb.com/title/" + item[0].imdbID}
              className="link__block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item[0].Title} ({item[0].Year})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;
