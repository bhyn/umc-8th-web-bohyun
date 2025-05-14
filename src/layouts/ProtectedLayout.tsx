import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => {
    const{accessToken} = useAuth();

    if(!accessToken){
        return <Navigate to={'/login'} replace/>
    }

    
    return (
        <div className='h-dvh flex flex-col'>
            <Navbar />
            <main className='flex-1'>
                <Outlet />
            </main>
            <footer>푸터</footer>
        </div>
    );
}

export default ProtectedLayout;