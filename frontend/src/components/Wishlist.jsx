import { useNavigate } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import ImageWithFallback from "./ImageWithFallback";
import { generatePlaceholderImage } from "../utils/imageUtils";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleFilmClick = (filmId) => {
    navigate(`/film/${filmId}`);
  };

  const handleRemove = (e, filmId) => {
    e.stopPropagation();
    removeFromWishlist(filmId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h1>Your Wishlist</h1>
        <p>No films added to your wishlist yet.</p>
        <button className="cta-button" onClick={() => navigate("/")}>
          Browse Films
        </button>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <header className="wishlist-header">
        <h1>Your Wishlist</h1>
        <p>
          {wishlist.length} film{wishlist.length !== 1 ? "s" : ""} in your
          collection
        </p>
      </header>

      <div className="wishlist-grid">
        {wishlist.map((film) => (
          <div
            key={film.id}
            className={`wishlist-item ${film.category}`}
            onClick={() => handleFilmClick(film.id)}
          >
            <div className="film-image">
              <ImageWithFallback
                src={film.image}
                alt={film.title}
                fallbackSrc={generatePlaceholderImage(
                  film.title,
                  film.category
                )}
                className="film-poster-image"
              />
              <button
                className="remove-btn"
                onClick={(e) => handleRemove(e, film.id)}
                aria-label="Remove from wishlist"
              >
                ×
              </button>
            </div>
            <div className="film-info">
              <h3 className={`film-title ${film.category}`}>{film.title}</h3>
              <span className={`category ${film.category}`}>
                {film.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
