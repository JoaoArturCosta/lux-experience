import { useEffect } from "react";
import { useFilmOperations } from "../hooks/useFilmOperations";
import FilmCarousel from "./FilmCarousel";

const Homepage = () => {
  const { fetchFilms, getFilmsByCategory, loading, error, filmsLoaded } =
    useFilmOperations();

  useEffect(() => {
    // Only fetch if not already loaded
    if (!filmsLoaded) {
      fetchFilms();
    }
  }, [fetchFilms, filmsLoaded]);

  if (loading && !filmsLoaded) {
    return <div className="loading">Loading films...</div>;
  }

  if (error && !filmsLoaded) {
    return <div className="error">Error loading films: {error}</div>;
  }

  return (
    <div className="homepage">
      <header className="hero">
        <h1>Discover Amazing Films</h1>
        <p>Browse through our curated collection of movies</p>
      </header>

      <main className="film-sections">
        <FilmCarousel
          title="Action Movies"
          films={getFilmsByCategory("action")}
          category="action"
        />
        <FilmCarousel
          title="Comedy Movies"
          films={getFilmsByCategory("comedy")}
          category="comedy"
        />
        <FilmCarousel
          title="Drama Movies"
          films={getFilmsByCategory("drama")}
          category="drama"
        />
      </main>
    </div>
  );
};

export default Homepage;
