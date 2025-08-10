import { useNavigate } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";
import { generatePlaceholderImage } from "../utils/imageUtils";

const FilmCarousel = ({ title, films, category }) => {
  const navigate = useNavigate();

  const handleFilmClick = (filmId) => {
    navigate(`/film/${filmId}`);
  };

  return (
    <section className={`film-carousel ${category}`}>
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-container">
        <div className="films-grid">
          {films.map((film) => (
            <div
              key={film.id}
              className={`film-card ${category}`}
              onClick={() => handleFilmClick(film.id)}
            >
              <div className="film-image">
                <ImageWithFallback
                  src={film.image}
                  alt={film.title}
                  fallbackSrc={generatePlaceholderImage(film.title, category)}
                  className="film-poster-image"
                  loading="lazy"
                />
              </div>
              <div className="film-info">
                <h3 className="film-title">{film.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilmCarousel;
