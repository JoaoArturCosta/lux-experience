import { createContext, useReducer } from "react";
import axios from "axios";

// Action types
const ACTIONS = {
  FETCH_FILMS_START: "FETCH_FILMS_START",
  FETCH_FILMS_SUCCESS: "FETCH_FILMS_SUCCESS",
  FETCH_FILMS_ERROR: "FETCH_FILMS_ERROR",
  FETCH_FILM_START: "FETCH_FILM_START",
  FETCH_FILM_SUCCESS: "FETCH_FILM_SUCCESS",
  FETCH_FILM_ERROR: "FETCH_FILM_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Initial state
const initialState = {
  films: { action: [], comedy: [], drama: [] },
  filmsById: {}, // Indexed by ID for quick lookup
  loading: false,
  error: null,
  filmsLoaded: false, // Track if films have been loaded
};

// Reducer function
const filmsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_FILMS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ACTIONS.FETCH_FILMS_SUCCESS: {
      // Create filmsById index for quick lookup
      const filmsById = {};
      Object.values(action.payload).forEach((categoryFilms) => {
        categoryFilms.forEach((film) => {
          filmsById[film.id] = film;
        });
      });

      return {
        ...state,
        films: action.payload,
        filmsById,
        loading: false,
        error: null,
        filmsLoaded: true,
      };
    }

    case ACTIONS.FETCH_FILMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTIONS.FETCH_FILM_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ACTIONS.FETCH_FILM_SUCCESS:
      return {
        ...state,
        filmsById: {
          ...state.filmsById,
          [action.payload.id]: action.payload,
        },
        loading: false,
        error: null,
      };

    case ACTIONS.FETCH_FILM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create context
const FilmsContext = createContext();

// Provider component
export const FilmsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filmsReducer, initialState);

  // Fetch all films
  const fetchFilms = async () => {
    if (state.filmsLoaded) return; // Don't fetch if already loaded

    dispatch({ type: ACTIONS.FETCH_FILMS_START });

    try {
      const response = await axios.get("http://localhost:3001/api/films");
      dispatch({
        type: ACTIONS.FETCH_FILMS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching films:", error);
      dispatch({
        type: ACTIONS.FETCH_FILMS_ERROR,
        payload: error.message || "Failed to fetch films",
      });
    }
  };

  // Fetch individual film (fallback when not in store)
  const fetchFilm = async (id) => {
    // Check if film is already in store
    if (state.filmsById[id]) {
      return state.filmsById[id];
    }

    dispatch({ type: ACTIONS.FETCH_FILM_START });

    try {
      const response = await axios.get(`http://localhost:3001/api/film/${id}`);
      dispatch({
        type: ACTIONS.FETCH_FILM_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching film:", error);
      dispatch({
        type: ACTIONS.FETCH_FILM_ERROR,
        payload: error.message || "Failed to fetch film",
      });
      throw error;
    }
  };

  // Get film by ID (from store or fetch if needed)
  const getFilmById = async (id) => {
    if (state.filmsById[id]) {
      return state.filmsById[id];
    }

    // If films haven't been loaded yet, load them first
    if (!state.filmsLoaded) {
      await fetchFilms();
      // Check again after loading
      if (state.filmsById[id]) {
        return state.filmsById[id];
      }
    }

    // If still not found, fetch individually
    return await fetchFilm(id);
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    fetchFilms,
    fetchFilm,
    getFilmById,
    clearError,
  };

  return (
    <FilmsContext.Provider value={value}>{children}</FilmsContext.Provider>
  );
};

export { FilmsContext };
