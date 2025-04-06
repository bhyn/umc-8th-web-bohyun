import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../../types/movie';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const MoviesPage = () => {
  const { category } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2QwYjMwYzQzM2U2NWQ1MjI0NjQ1ZTRmM2JlM2JmYiIsIm5iZiI6MTc0MzYwMzg4NS4yMjgsInN1YiI6IjY3ZWQ0OGFkNGVkNWI1MjcyMWNlNThlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.280RXuoHC3s6dfrIhFoOHCzjXLzX8AKCierpR2QJ1gw`,
            },
          }
        );
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  if (isLoading) {
    return <div className="text-center p-12">🎬 데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div>
      <div className="text-center mt-5">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`mr-2 px-4 py-2 rounded font-bold text-white ${
            page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          이전
        </button>
        <span>{page}페이지</span>
        <button
          onClick={handleNext}
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border-none rounded font-bold cursor-pointer"
        >
          다음
        </button>
      </div>

      <ul className="flex flex-wrap list-none p-0 m-0">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="w-1/6 p-2 flex flex-col items-center relative"
            onMouseEnter={() => setHoveredId(movie.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link to={`/movies/${category}/${movie.id}`} className="w-full block">
              <div className="relative w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={`w-full transition-all duration-300 ${
                    hoveredId === movie.id ? 'blur-sm' : ''
                  }`}
                />
                {hoveredId === movie.id && (
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white bg-black bg-opacity-60 rounded p-2 text-center overflow-auto">
                    <h1 className="text-sm font-semibold mb-2">{movie.title}</h1>
                    <p className="text-xs">{movie.overview}</p>
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
