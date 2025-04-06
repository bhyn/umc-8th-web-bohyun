import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '../../types/movie';

const MovieDetailPage = () => {
    const {id}=useParams<{id:string}>()
    //현재 URL 경로에 들어 있는 :id 파라미터를 꺼내는 코드입니다.
    // //예를 들어 사용자가 /movies/popular/12345 같은 경로로 이동했다면,
    //id에는 "12345" (string 타입)가 들어옵니다.
    const [movie, setMovie] = useState<Movie | null>(null);
    //단일 영화 정보를 저장할 state입니다.
    //처음에는 영화 정보를 아직 못 불러왔기 때문에 null로 초기화합니다.
    //이후 API 호출을 통해 데이터를 받아오면 setMovie(data)로 정보를 저장합니다.
    //Movie는 전하께서 만든 types/movie.ts에 정의된 영화 정보 인터페이스일 것입니다.
    //Movie | null이라는 뜻은:"movie라는 변수에는 Movie 타입 객체가 들어올 수도 있고, 아니면 아직 없을 수도 있다(null)"
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
    return <div style={{ textAlign: 'center', padding: '40px' }}>영화 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>평점: {movie.vote_average}</p>
      <p>개봉일: {movie.release_date}</p>
    </div>
  );
};

export default MovieDetailPage;