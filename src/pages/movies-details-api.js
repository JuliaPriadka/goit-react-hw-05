import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export default async function getMoviesById(movieId) {
  const response = await axios.get(`movie/${movieId}`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjY2NDc3MmI2YzAwMmQ1MjU5MGIyNGQxNzdmNTU2YiIsInN1YiI6IjY2NjBhNWU4MzJhZTkzYWNiMGEyMjhhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XKpwWjYzPFqTZsRaN75QePvuUJuUl5t6HdrY8OKnjlQ',
    },
  });
  return response.data;
}
