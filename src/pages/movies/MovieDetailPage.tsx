import { useParams } from 'react-router-dom';
import useCustomHook from '../../hooks/useCustomHook'; // 만든 훅 불러오기
import { Movie } from '../../types/movie';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, isLoading } = useCustomHook({ id }); // 커스텀 훅 사용해서 데이터 불러오기

  if (isLoading || !movie) {
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
