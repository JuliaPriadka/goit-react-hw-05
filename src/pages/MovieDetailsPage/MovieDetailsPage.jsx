import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import getMoviesById from '../movies-details-api';
import css from './MovieDetailsPage.module.css';
import { ColorRing } from 'react-loader-spinner';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import { GoArrowLeft } from 'react-icons/go';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState('');
  const location = useLocation();

  const backLink = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setError(false);
        setLoader(true);
        const data = await getMoviesById(movieId);
        setMovieDetails(data);
        const movieGenres = data.genres.map(genre => genre.name);
        const movieGenresString = movieGenres.join(' ');
        setGenres(movieGenresString);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getMovieDetails();
  }, [movieId]);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      <Link className={css.goBackLink} to={backLink.current}>
        <GoArrowLeft />
        Go back
      </Link>
      <div className={css.movieInfo}>
        <img
          className={css.moviePoster}
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
              : defaultImg
          }
          alt={movieDetails.title}
        />
        <div>
          <h3>{movieDetails.title}</h3>
          <p>Popularity : {movieDetails.popularity}</p>
          <h4>Overview</h4>
          <p>{movieDetails.overview}</p>
          <h4>Genres</h4>
          <p>{genres}</p>
        </div>
      </div>
      <h4>Additional information</h4>
      <ul className={css.movieAdditionalInfo}>
        <li>
          <Link to="cast" className={css.movieAdditionalInfoItem}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" className={css.movieAdditionalInfoItem}>
            Rewiews
          </Link>
        </li>
      </ul>
      {loader && (
        <ColorRing
          visible={true}
          height="40"
          width="40"
          colors={['rgb(255, 0, 0)', 'rgb(85, 26, 139)']}
        />
      )}
      {error && <ErrorMsg />}
      <Outlet />
    </>
  );
}
