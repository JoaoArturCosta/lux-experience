import { useContext } from "react";
import { FilmsContext } from "../contexts/FilmsContext";

export const useFilms = () => {
  const context = useContext(FilmsContext);
  if (!context) {
    throw new Error("useFilms must be used within a FilmsProvider");
  }
  return context;
};
