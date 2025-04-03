import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
  

    
    const fetchMovies = async () => {
        try{
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1' ,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjI0YjZjOWU4NDllYjBmYTJkOTAwMDJiYWY0YzZkNCIsIm5iZiI6MTc0MzYwMzg4NS4yMjgsInN1YiI6IjY3ZWQ0OGFkNGVkNWI1MjcyMWNlNThlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b-SXEMnqLIOjNQwhnNty9cCHZCMWtqtjAV8tCJ8IXB0`, // 생략 가능
          },
        }
      );
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    finally {
      setIsLoading(false); // 로딩 완료     
    }

};

    fetchMovies();
  }, []);


  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '16px' }}>
        🎬 데이터를 불러오는 중입니다...
      </div>
    );
  }
  
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
                      <h1>upcoming!</h1>

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
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '6px',
                padding: '10px',
                textAlign: 'center',
                overflow: 'auto',
                }}
            >
                <h1 style={{ fontSize: '16px', marginBottom: '10px' }}>
                    {movie.title}
                </h1>
                <p style={{ fontSize: '12px' }}>
                    {movie.overview}
                </p>
            </div>
)}

          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
