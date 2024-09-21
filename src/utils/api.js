import movieInfo from 'movie-info-homeserver';
import movieTrailer from 'movie-trailer'; 

export const fetchMovie = async (query) => {
  try {
    const response = await movieInfo(query);
    return response;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
};

export const fetchTrailer = async (title) => {
  try {
    const url = await movieTrailer(title);
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};
