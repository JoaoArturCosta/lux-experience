import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import { useFilmOperations } from "../hooks/useFilmOperations";
import ImageWithFallback from "./ImageWithFallback";
import { generatePlaceholderImage } from "../utils/imageUtils";

const FilmDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { getFilmById, getFilmFromStore } = useFilmOperations();

  useEffect(() => {
    const loadFilm = async () => {
      setLoading(true);
      setError(null);

      try {
        // First check if film is in store
        const filmFromStore = getFilmFromStore(id);
        if (filmFromStore) {
          setFilm(filmFromStore);
          setLoading(false);
          return;
        }

        // If not in store, fetch it
        const fetchedFilm = await getFilmById(id);
        setFilm(fetchedFilm);
      } catch (err) {
        console.error("Error loading film:", err);
        setError(err.message || "Failed to load film");
      } finally {
        setLoading(false);
      }
    };

    loadFilm();
  }, [id, getFilmById, getFilmFromStore]);

  const isInWishlist = film && wishlist.find((item) => item.id === film.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(film.id);
    } else {
      addToWishlist(film);
    }
  };

  const getButtonText = () => {
    switch (film?.category) {
      case "action":
        return isInWishlist ? "Remove from Action List" : "Add to Action List";
      case "comedy":
        return isInWishlist ? "Remove from Favorites" : "Add to Favorites";
      case "drama":
        return isInWishlist ? "Remove from Collection" : "Add to Collection";
      default:
        return isInWishlist ? "Remove from Wishlist" : "Add to Wishlist";
    }
  };

  if (loading) {
    return <div className="loading">Loading film details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!film) {
    return <div className="error">Film not found</div>;
  }

  return (
    <div className={`film-detail ${film.category}`}>
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className="detail-container">
        <div className="film-poster">
          <ImageWithFallback
            src={film.image}
            alt={film.title}
            fallbackSrc={generatePlaceholderImage(film.title, film.category)}
            className="film-poster-image"
          />
        </div>

        <div className="film-info">
          <h1 className={`film-title ${film.category}`}>{film.title}</h1>
          <div className={`category-badge ${film.category}`}>
            {film.category.toUpperCase()}
          </div>
          <p className={`film-description ${film.category}`}>
            {film.description}
          </p>

          <button
            className={`wishlist-btn ${film.category} ${
              isInWishlist ? "in-wishlist" : ""
            }`}
            onClick={handleWishlistToggle}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
