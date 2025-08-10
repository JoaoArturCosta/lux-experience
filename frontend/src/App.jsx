import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { FilmsProvider } from "./contexts/FilmsContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Homepage from "./components/Homepage";
import FilmDetail from "./components/FilmDetail";
import Wishlist from "./components/Wishlist";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (film) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === film.id)) {
        return prev;
      }
      return [...prev, film];
    });
  };

  const removeFromWishlist = (filmId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== filmId));
  };

  const wishlistValue = { wishlist, addToWishlist, removeFromWishlist };

  return (
    <FilmsProvider>
      <WishlistProvider value={wishlistValue}>
        <Router>
          <div className="app">
            <Navigation />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/film/:id" element={<FilmDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </div>
        </Router>
      </WishlistProvider>
    </FilmsProvider>
  );
}

export default App;
