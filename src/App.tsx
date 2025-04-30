import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";  


// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

const publicRoutes:RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children:[
      {index:true,element:<HomePage />},
      {path:'login',element:<LoginPage />},
      {path:'signup',element:<SignupPage />},
      {path:"v1/auth.google/callback", element:<GoogleLoginRedirectPage/>},
    ]
  }
];

const protectedRoutes:RouteObject[] = [
  {
    path: "/",
    children:[
      {
        path: "/my",
        element:<MyPage />,
      
      }
    ]
  }
const router = createBrowserRouter(...publicRoutes);

function App() {

  return (
    <AuthProvider>
   <RouterProvider router={router} />
    </AuthProvider>
  );  
}

export default App;