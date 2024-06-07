import { useEffect, useState } from 'react';
import { getMovies } from '../../movies-api';
import { ColorRing } from 'react-loader-spinner';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import MovieList from '../../components/MovieList/MovieList';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);

  const location = useLocation();

  useEffect(() => {
    async function getPopularMovies() {
      try {
        setError(false);
        setLoader(true);
        const data = await getMovies();
        setPopularMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getPopularMovies();
  }, []);

  return (
    <>
      <MovieList popularMovies={popularMovies} location={location} />
      {loader && (
        <ColorRing
          visible={true}
          height="40"
          width="40"
          colors={['rgb(255, 0, 0)', 'rgb(85, 26, 139)']}
        />
      )}
      {error && <ErrorMsg />}
    </>
  );
}
