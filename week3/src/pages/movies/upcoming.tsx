import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [page, setPage] = useState(1); // ✅ 페이지 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true); // 💡 여기 추가! -> 페이지 넘길 때도 로딩상태

        try{
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=${page}` ,
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
  }, [page]);


  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1)); // 1보다 작아지지 않게
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '16px' }}>
        🎬 데이터를 불러오는 중입니다...
      </div>
    );
  }
  
  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
  <button
    onClick={handlePrev}
    disabled={page === 1} //페이지가 1이면 이전버튼이 비활성화됨. 
    style={{
      marginRight: '10px',
      padding: '8px 16px',
      backgroundColor: page === 1 ? '#ccc' : '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: page === 1 ? 'not-allowed' : 'pointer',
      fontWeight: 'bold',
    }}
  >
    이전
  </button>
  <text style={{ textAlign: 'center' }}>{page}번째 페이지 </text>

  <button
    onClick={handleNext}
    style={{
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    }}
  >
    다음
  </button>
</div>

{isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>
      ) : (
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            listStyleType: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {movies.map((movie) => (
            <li
              key={movie.id}
              style={{
                width: '16.66%',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
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
                    <h1 style={{ fontSize: '16px', marginBottom: '10px' }}>{movie.title}</h1>
                    <p style={{ fontSize: '12px' }}>{movie.overview}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      
    </div>
  );
};

export default MoviesPage;