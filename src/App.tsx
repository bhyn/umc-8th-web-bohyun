import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home';
import NotFound from './pages/not-found';
import MoviesPage from './pages/movies/MoviesPage'; // ✅ import 하나로 해결
import MovieDetailPage from './pages/movies/MovieDetailPage'; // ✅ import 하나로 해결
import RootLayout from './layout/root-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies/:category', //이렇게 생긴 게 들어오면 category에 그 단어를 할당하고 MoviesPage를 표시해라는 뜻
        element: <MoviesPage />,
      },
      {
        path: 'movies/:category/:id',
        element: <MovieDetailPage />,
      }
    ],
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}


export default App;