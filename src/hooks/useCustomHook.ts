import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';

interface UseCustomFetchOptions {
  id?: string;
  category?: string;
  page?: number;
}

const useCustomHook = ({ id, category, page = 1 }: UseCustomFetchOptions = {}) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const { data } = await axios.get<Movie>(
            `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2QwYjMwYzQzM2U2NWQ1MjI0NjQ1ZTRmM2JlM2JmYiIsIm5iZiI6MTc0MzYwMzg4NS4yMjgsInN1YiI6IjY3ZWQ0OGFkNGVkNWI1MjcyMWNlNThlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.280RXuoHC3s6dfrIhFoOHCzjXLzX8AKCierpR2QJ1gw`, // 나중에 .env에서 불러오면 더 좋음!
              },
            }
          );
          setMovie(data);
          setMovies([]);
        } else if (category) {
          const { data } = await axios.get<MovieResponse>(
            `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2QwYjMwYzQzM2U2NWQ1MjI0NjQ1ZTRmM2JlM2JmYiIsIm5iZiI6MTc0MzYwMzg4NS4yMjgsInN1YiI6IjY3ZWQ0OGFkNGVkNWI1MjcyMWNlNThlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.280RXuoHC3s6dfrIhFoOHCzjXLzX8AKCierpR2QJ1gw`,
              },
            }
          );
          setMovie(null);
          setMovies(data.results);
        }
      } catch (error) {
        console.error('오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id, category, page]);

  return { movie, movies, isLoading };
};

export default useCustomHook;
