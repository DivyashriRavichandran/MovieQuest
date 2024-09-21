import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMovie } from '../../utils/api';
import './MovieSearch.scss';

const MovieSearch = ({ setMovie }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const movieData = await fetchMovie(query);
      if (movieData && movieData.title) {
        setMovie(movieData);
      } else {
        setMovie(null); 
        setError('No results found');
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
      setError('An error occurred while fetching movie data');
    }
  };

  return (
    <motion.div
      className="search-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </motion.div>
  );
};

export default MovieSearch;
