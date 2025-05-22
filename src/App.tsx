import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";  
import MyPage from "./pages/MyPage"; 
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";
import { RouteObject } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import LpDetailPage from "./pages/LpDetailPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";




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
      {path: "v1/auth/google/callback",element:<GoogleLoginRedirectPage/>},
      {path: 'lps/:lpId',element:<LpDetailPage/>},
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


export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client = {queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}


export default App;