import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../movies-api';
import { useEffect, useState } from 'react';
import css from './MovieReviews.module.css';
import { ColorRing } from 'react-loader-spinner';
import ErrorMsg from '../ErrorMsg/ErrorMsg';

export default function MovieReviews() {
  const { movieId } = useParams();

  const [movieReviews, setMovieReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function getReviews() {
      try {
        setError(false);
        setLoader(true);
        const data = await getMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <>
      {loader && (
        <ColorRing
          visible={true}
          height="40"
          width="40"
          colors={['rgb(255, 0, 0)', 'rgb(85, 26, 139)']}
        />
      )}
      {error && <ErrorMsg />}
      <div className={css.reviews}>
        <ul>
          {movieReviews.length === 0 ? (
            <p>Sorry! We don`t have a review at this film</p>
          ) : (
            movieReviews.map(review => (
              <li key={review.id}>
                <p className={css.movieAuthor}>{review.author}</p>
                <p>{review.content}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
