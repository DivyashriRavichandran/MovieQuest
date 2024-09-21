import React, { useState } from 'react';
import MovieSearch from './components/MovieSearch/MovieSearch';
import MovieDetails from './components/MovieDetails/MovieDetails';
import './App.css';

import '@fontsource-variable/gabarito';

function App() {
  const [movie, setMovie] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <img src="/logo1.png" alt="MovieQuest Logo" />
        <p>Simply search for your favorite movie and instantly discovery release date, 
          rating, summary, and even the trailer—all in one place. MovieQuest makes 
          exploring movies, easy and enjoyable with a simple design and seamless user 
          experience, perfect for film enthusiasts eager to discover their next watch.</p>
      </header>
      <MovieSearch setMovie={setMovie} />
      {movie && <MovieDetails movie={movie} />}
    </div>
  );
}

export default App;
