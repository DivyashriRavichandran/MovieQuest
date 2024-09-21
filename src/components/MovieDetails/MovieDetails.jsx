import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchTrailer } from '../../utils/api'; 
import './MovieDetails.scss';

const MovieDetails = ({ movie }) => {
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    if (movie) {
      const fetchMovieTrailer = async () => {
        const trailer = await fetchTrailer(movie.title || movie.name);
        setTrailerUrl(trailer);
      };
      
      fetchMovieTrailer();
    }
  }, [movie]);

  if (!movie) return null;

  const { title, poster_path, release_date, vote_average, overview } = movie;

  // Function to format date to "Month Day, Year"
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Function to determine the star rating based on IMDb rating (out of 10)
  const getStarRating = (rating) => {
    const scaledRating = (rating / 10) * 5; // Convert to 5-star scale
    const fullStars = Math.floor(scaledRating);
    const halfStar = scaledRating % 1 >= 0.25; // Show half-star if remainder is at least 0.25
    return { fullStars, halfStar };
  };

  const { fullStars, halfStar } = getStarRating(vote_average);

  return (
    <motion.div
      className="movie-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="details-container">
        <img src={`http://image.tmdb.org/t/p/original${poster_path}`} alt={title} />
        <div className="movie-info">
          <h1>{title}</h1>
          <div className="info-list">
            <p><strong>Release Date:</strong> {formatDate(release_date)}</p>
            <p><strong>Rating:</strong> {vote_average} 
              <span className="star-rating">
                {Array(fullStars).fill(null).map((_, index) => (
                  <span key={index} className="star full-star">★</span>
                ))}
                {halfStar && <span className="star half-star">★</span>}
                {Array(5 - fullStars - (halfStar ? 1 : 0)).fill(null).map((_, index) => (
                  <span key={index} className="star empty-star">★</span>
                ))}
              </span>
            </p>
            <p><strong>Summary:</strong> <span className="summary-text">{overview}</span></p>
          </div>
        </div>
      </div>
      {trailerUrl && (
        <div className="trailer-container">
          <h2>Movie Clip:</h2>
          <iframe
            width="100%"
            height="auto"
            src={`https://www.youtube.com/embed/${trailerUrl}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </motion.div>
  );
};

export default MovieDetails;
