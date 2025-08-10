import { useCallback } from "react";
import { useFilms } from "./useFilms";

export const useFilmOperations = () => {
  const {
    fetchFilms,
    getFilmById,
    films,
    filmsById,
    loading,
    error,
    filmsLoaded,
  } = useFilms();

  // Get films by category
  const getFilmsByCategory = useCallback(
    (category) => {
      return films[category] || [];
    },
    [films]
  );

  // Get all films as a flat array
  const getAllFilms = useCallback(() => {
    return Object.values(films).flat();
  }, [films]);

  // Check if a film exists in store
  const hasFilm = useCallback(
    (id) => {
      return !!filmsById[id];
    },
    [filmsById]
  );

  // Get film by ID (synchronous - from store only)
  const getFilmFromStore = useCallback(
    (id) => {
      return filmsById[id] || null;
    },
    [filmsById]
  );

  return {
    // State
    films,
    filmsById,
    loading,
    error,
    filmsLoaded,

    // Actions
    fetchFilms,
    getFilmById,

    // Utilities
    getFilmsByCategory,
    getAllFilms,
    hasFilm,
    getFilmFromStore,
  };
};
