import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

// 1. 만든 페이지들을 import
import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import Movies from "./pages/movies";
import RootLayout from "./layout/root-layout"
// 2. 연결
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
                index: true,
                element: <HomePage/>
            },
            {
                // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'movies/:movieId',
                element: <Movies/>
            },
            {
                path: 'movies',
                element: <Movies/>
            }
        ]
    }
])

function App() {
    return <RouterProvider router={router}/>
}

export default App
