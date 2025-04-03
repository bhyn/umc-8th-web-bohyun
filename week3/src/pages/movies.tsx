import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9...`, // 생략 가능
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyleType: 'none',
        padding: 0,
        margin: 0,
      }}
    >
      {movies?.map((movie) => (
        <li
          key={movie.id}
          style={{
            width: '16.66%',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative', // ✅ 제목을 포스터 위에 띄우기 위해 필요
          }}
          onMouseEnter={() => setHoveredId(movie.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: '100%',
                filter: hoveredId === movie.id ? 'blur(4px)' : 'none',
                transition: 'filter 0.3s ease',
                borderRadius: 'px',
              }}
            />
            {hoveredId === movie.id && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  padding: '10px 15px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  textAlign: 'center',
                }}
              >
                {movie.title}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
