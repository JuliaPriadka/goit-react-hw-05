import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjY2NDc3MmI2YzAwMmQ1MjU5MGIyNGQxNzdmNTU2YiIsInN1YiI6IjY2NjBhNWU4MzJhZTkzYWNiMGEyMjhhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XKpwWjYzPFqTZsRaN75QePvuUJuUl5t6HdrY8OKnjlQ',
  },
};

export const getMovies = async () => {
  const response = await axios.get('trending/movie/day', options);
  return response.data.results;
};

export const getMovieReviews = async id => {
  const response = await axios.get(`movie/${id}/reviews`, options);
  return response.data.results;
};

export const getMovieCastById = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const searchMovies = async query => {
  const response = await axios.get(`search/movie?query=${query}`, options);
  return response.data.results;
};
