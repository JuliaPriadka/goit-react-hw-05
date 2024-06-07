import { useLocation, useSearchParams } from 'react-router-dom';
import SearchForm from '../../components/SearchForm/SearchForm';
import { useEffect, useState } from 'react';
import { searchMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import { ColorRing } from 'react-loader-spinner';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  const userSearch = searchParams.get('query');

  const handleSubmit = value => {
    setSearchParams({ query: value });
  };

  useEffect(() => {
    async function getSearchedMovies() {
      try {
        setError(false);
        setLoader(true);
        const data = await searchMovies(userSearch);
        setFilteredMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getSearchedMovies();
  }, [userSearch]);

  return (
    <>
      <SearchForm handleSubmit={handleSubmit} />
      {userSearch && (
        <MovieList popularMovies={filteredMovies} location={location} />
      )}
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
