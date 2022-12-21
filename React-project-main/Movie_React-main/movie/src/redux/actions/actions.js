import axios from "axios";
import { baseUrl, apiKey } from "../constants";
import {
  ADD_MOVIES,
  ADD_MOVIE_TO_LIST,
  ADD_POST_MOVIES,
  REMOVE_MOVIE_TO_LIST,
  SET_LINKACTIVE,
} from "./actions-type";

export const getPostMovies = (imdbID) => {
  return function (dispatch) {
    let postMovies = [];
    axios
      .get(baseUrl + `?i=${imdbID}&apikey=${apiKey}`)
      .then((res) => res.data)
      .then((data) => {
        postMovies = [...postMovies, data];
        dispatch(addPostMovie(postMovies));
      });
  };
};

export const getMovies = async (searchLine) => {
  const res = await axios.get(baseUrl + `?s=${searchLine}&apikey=${apiKey}`);
  const data = res.data.Search;
  if (!data) {
    throw console.log("Error");
  }
  return data;
};

export const addMovies = (payload) => ({
  type: ADD_MOVIES,
  payload,
});

export const addListMovie = (payload) => ({
  type: ADD_MOVIE_TO_LIST,
  payload,
});

export const removeListMovie = (payload) => ({
  type: REMOVE_MOVIE_TO_LIST,
  payload,
});

export const setLinkActive = (payload) => ({
  type: SET_LINKACTIVE,
  payload,
});

export const addPostMovie = (payload) => ({
  type: ADD_POST_MOVIES,
  payload,
});
