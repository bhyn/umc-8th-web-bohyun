import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '../../types/movie';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  //useParams는 	URL의 경로 파라미터를 객체로 반환하는 함수
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true); //setIsLoading을 true로 설정
      try {
        const { data } = await axios.get<Movie>( //(url, options)형식 //"받아올 정보는 Movie 타입일 것이다”라고 명시해줌 
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2QwYjMwYzQzM2U2NWQ1MjI0NjQ1ZTRmM2JlM2JmYiIsIm5iZiI6MTc0MzYwMzg4NS4yMjgsInN1YiI6IjY3ZWQ0OGFkNGVkNWI1MjcyMWNlNThlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.280RXuoHC3s6dfrIhFoOHCzjXLzX8AKCierpR2QJ1gw`,
            },
          }
        );
        setMovie(data); //movie의 상태를 data로 설정하기
      } catch (error) { //try를 실행하다가 오류가 나면 바로 catch로 넘어감감
        console.error('Error fetching movies:', error);
      } finally { //성공하든 실패하든, 마지막으로 실행됨
        setIsLoading(false); //이것때문에 if (isLoading || !movie)이 실행됨
      }
    };

    if (id) {
      fetchMovie(); 
      //id가 있을 때만 위에서 정의한 fetchMovie를 호출
    }
  }, [id]); //id값이 변경될 때마다(사용자가 영화 상세 페이지를 이동하면면) useEffect가 실행됨(영화 정보를 가져옴)


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
