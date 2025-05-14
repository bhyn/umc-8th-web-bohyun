import {Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const {accessToken} = useAuth();

    return(
        <nav className='flex justify-between items-center p-4 bg-gray-50'>
            <div className="space-x-2">
                {!accessToken && (
                    <>
                <Link
                    to="/login"
                    className='bg-gray-200 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all mx-1'
                >
                    로그인
                </Link>
                <Link
                    to="/signup"
                    className='bg-gray-200 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all mx-1'
                >
                    회원가입
                </Link>
                </>
                )}
                <Link
                    to="/"
                    className='bg-gray-200 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all mx-1'
                >
                    홈페이지 
                </Link>
                
                {accessToken && (
                <Link
                    to="/my"
                    className='bg-gray-200 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all mx-1'
                >
                    마이페이지
                </Link>
                )}


                <Link
                to = {"/search"}
                className = "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                    검색하시오!
                </Link>
            </div>
        </nav>
            
            )

}

export default Navbar;