import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";  
import MyPage from "./pages/MyPage"; // 마이페이지 추가
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";
import { RouteObject } from "react-router-dom";

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

//public Routes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[]=[
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children:[
      {index:true,element:<HomePage />},
      {path:'login',element:<LoginPage />},
      {path:'signup',element:<SignupPage />},
    ]
  }
];

const protectedRoutes: RouteObject[]=[

  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children:[
      {
        path: "my",
        element: <MyPage />,
      },
    ]
  }
]



const router = createBrowserRouter([...publicRoutes,...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}


export default App;