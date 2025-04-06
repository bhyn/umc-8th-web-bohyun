import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '../../types/movie';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2QwYjMwYzQzM2U2NWQ1MjI0NjQ1ZTRmM2JlM2JmYiIsIm5iZiI6MTc0MzYwMzg4NS4yMjgsInN1YiI6IjY3ZWQ0OGFkNGVkNWI1MjcyMWNlNThlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.280RXuoHC3s6dfrIhFoOHCzjXLzX8AKCierpR2QJ1gw`,
            },
          }
        );
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="text-center p-10 text-gray-600 text-lg">
        🎬 영화 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{movie.title}</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded shadow-lg max-w-[180px]"
        />
        <div className="space-y-4 text-sm text-gray-800 leading-relaxed">
          <p>{movie.overview}</p>
          <p>
            <span className="font-semibold text-gray-600">평점:</span>{' '}
            <span className="font-bold text-blue-600">{movie.vote_average}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">개봉일:</span>{' '}
            <span className="font-bold">{movie.release_date}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
