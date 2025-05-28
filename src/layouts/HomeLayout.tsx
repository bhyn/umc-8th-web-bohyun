import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav className="flex justify-between items-center p-4 bg-gray-50">
        <div className="space-x-2">
          <>
            <Link
              to="/login"
              className="bg-gray-200 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all mx-1"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="bg-gray-200 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all mx-1"
            >
              회원가입
            </Link>
          </>

          <Link
            to="/"
            className="bg-gray-200 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all mx-1"
          >
            홈페이지
          </Link>

          <Link
            to="/my"
            className="bg-gray-200 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all mx-1"
          >
            마이페이지
          </Link>

          <Link
            to={"/search"}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            검색하시오!
          </Link>
        </div>
      </nav>
      <main className="flex-1">
        <Outlet /> //여기에 자식 컴포넌트를 보여줘
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default HomeLayout;
