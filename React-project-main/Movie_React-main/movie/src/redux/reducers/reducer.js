import {
  ADD_MOVIES,
  ADD_MOVIE_TO_LIST,
  ADD_POST_MOVIES,
  REMOVE_MOVIE_TO_LIST,
  SET_LINKACTIVE,
} from "../actions/actions-type";

const initialState = {
  postMovies: [],
  linkActive: false,
  listMovies: [],
  movies: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_MOVIES:
      return { ...state, movies: payload };

    case ADD_MOVIE_TO_LIST:
      const movie = state.movies.find((item) => item.imdbID === payload);
      const listMovies = [...state.listMovies, { ...movie }];
      return { ...state, listMovies };

    case REMOVE_MOVIE_TO_LIST:
      const newLinkMovies = state.listMovies.filter(
        (item) => item.imdbID !== payload
      );
      return { ...state, listMovies: newLinkMovies };

    case SET_LINKACTIVE:
      return { ...state, linkActive: payload };
    case ADD_POST_MOVIES:
      return { ...state, postMovies: [...state.postMovies, payload] };
    default:
      return state;
  }
};
