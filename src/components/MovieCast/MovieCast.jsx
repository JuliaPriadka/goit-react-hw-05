import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCastById } from '../../movies-api';
import css from './MovieCast.module.css';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { ColorRing } from 'react-loader-spinner';

export default function MovieCast() {
  const { movieId } = useParams();

  const [movieCasts, setMovieCasts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function getMovieCast() {
      try {
        setError(false);
        setLoader(true);
        const data = await getMovieCastById(movieId);
        setMovieCasts(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  console.log(movieCasts.length);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

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
      <ul className={css.actorsList}>
        {movieCasts.length === 0 ? (
          <p className={css.noCast}>
            Sorry! We don`t have information about casts
          </p>
        ) : (
          movieCasts.map(movieCast => (
            <li key={movieCast.id} className={css.actorsListItem}>
              <img
                className={css.actor}
                src={
                  movieCast.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${movieCast.profile_path}`
                    : defaultImg
                }
                alt={movieCast.name}
              />
              <p>
                <span className={css.accent}>Actor :</span>
                {movieCast.name}
              </p>
              <p>
                <span className={css.accent}> Character :</span>
                {movieCast.character}
              </p>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
