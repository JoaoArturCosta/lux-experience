const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock film data with optimized image URLs
const films = {
  action: [
    {
      id: 1,
      title: "Mad Max: Fury Road",
      category: "action",
      image:
        "https://images.unsplash.com/photo-1489599953040-27804aba2d75?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
      description:
        "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    },
    {
      id: 2,
      title: "John Wick",
      category: "action",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
      description:
        "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.",
    },
    {
      id: 3,
      title: "The Dark Knight",
      category: "action",
      image:
        "https://images.unsplash.com/photo-1478720568477-b2709d01a8ea?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    },
  ],
  comedy: [
    {
      id: 4,
      title: "The Grand Budapest Hotel",
      category: "comedy",
      image:
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
      description:
        "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    },
    {
      id: 5,
      title: "Superbad",
      category: "comedy",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
      description:
        "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    },
    {
      id: 6,
      title: "Knives Out",
      category: "comedy",
      image:
        "https://images.unsplash.com/photo-1489599953040-27804aba2d75?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
      description:
        "A detective investigates the death of a patriarch of an eccentric, combative family.",
    },
  ],
  drama: [
    {
      id: 7,
      title: "The Shawshank Redemption",
      category: "drama",
      image:
        "https://images.unsplash.com/photo-1489599953040-27804aba2d75?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    },
    {
      id: 8,
      title: "Moonlight",
      category: "drama",
      image:
        "https://images.unsplash.com/photo-1489599953040-27804aba2d75?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
      description:
        "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
    },
    {
      id: 9,
      title: "Parasite",
      category: "drama",
      image:
        "https://images.unsplash.com/photo-1489599953040-27804aba2d75?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
      description:
        "A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.",
    },
  ],
};

// Routes
app.get("/api/films", (req, res) => {
  res.json(films);
});

app.get("/api/films/:category", (req, res) => {
  const { category } = req.params;
  if (films[category]) {
    res.json(films[category]);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
});

app.get("/api/film/:id", (req, res) => {
  const { id } = req.params;
  const filmId = parseInt(id);

  let foundFilm = null;
  for (const category in films) {
    foundFilm = films[category].find((film) => film.id === filmId);
    if (foundFilm) break;
  }

  if (foundFilm) {
    res.json(foundFilm);
  } else {
    res.status(404).json({ error: "Film not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
