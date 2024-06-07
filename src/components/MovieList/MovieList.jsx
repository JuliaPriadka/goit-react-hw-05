import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ popularMovies, location }) {
  return (
    <ul className={css.popularMovies}>
      {popularMovies.map(popularMovie => (
        <li key={popularMovie.id}>
          <Link
            className={css.popularMoviesLink}
            to={`/movies/${popularMovie.id}`}
            state={location}>
            {popularMovie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
