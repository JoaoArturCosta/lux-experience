import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";

const Navigation = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎬 FilmBrowser
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/wishlist" className="nav-link">
            Wishlist ({wishlist.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
