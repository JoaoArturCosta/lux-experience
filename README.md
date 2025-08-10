# Film Browser App

A React and Node.js application for browsing films by categories, with wishlist functionality and category-specific styling.

## Features

- **Homepage with 3 Film Carousels**: Action, Comedy, and Drama movies
- **Film Detail Pages**: Click on any film to view detailed information
- **Wishlist Functionality**: Add films to your personal wishlist
- **Category-Based Styling**: 
  - Different fonts for each category (Action: Roboto Slab, Comedy: Comic Neue, Drama: Playfair Display)
  - Different button styles and colors
  - Category-specific hover effects and themes
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 with Vite, React Router, Axios
- **Backend**: Node.js with Express
- **Development**: Docker for containerized development
- **Styling**: Custom CSS with Google Fonts

## Getting Started

### Option 1: Using Docker (Recommended)

1. **Clone and start the application:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Option 2: Manual Setup

1. **Start the Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start the Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Endpoints

- `GET /api/films` - Get all films by category
- `GET /api/films/:category` - Get films from specific category
- `GET /api/film/:id` - Get single film details

## Project Structure

```
.
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app with routing and context
│   │   └── App.css        # Styles with category-specific theming
│   └── package.json
├── backend/               # Node.js API server
│   ├── server.js          # Express server with mock data
│   └── package.json
├── docker-compose.yml     # Docker configuration
└── README.md
```

## Category Differences

### Action Movies
- **Font**: Roboto Slab (serif, bold)
- **Colors**: Red theme (#F44336)
- **Button**: Uppercase, letter-spaced, solid red
- **Style**: Strong, bold, militaristic

### Comedy Movies  
- **Font**: Comic Neue (cursive, playful)
- **Colors**: Orange theme (#FF9800)
- **Button**: Rounded, shadow effects, bounce animations
- **Style**: Fun, casual, friendly

### Drama Movies
- **Font**: Playfair Display (elegant serif)
- **Colors**: Purple theme (#9C27B0)
- **Button**: Outlined, sophisticated, subtle hover
- **Style**: Elegant, refined, classic

## Development

- Frontend runs on port 5173 with hot reload
- Backend runs on port 3001 with nodemon for auto-restart
- All dependencies are installed automatically with Docker