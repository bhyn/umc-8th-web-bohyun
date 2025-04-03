import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav
            style={{
                display: 'flex',
                gap: '10px',
                padding: '10px',
                backgroundColor: '#f0f0f0',
                fontSize: '12px',
                textAlign: 'center'
            }}
        >
            <NavLink
                to="/"
                style={({ isActive }) => ({
                    color: isActive ? 'green' : 'black',
                    textDecoration: 'none'
                })}
            >
                홈 페이지로 이동
            </NavLink>

            <NavLink
                to="/movies/popular"
                style={({ isActive }) => ({
                    color: isActive ? 'green' : 'black',
                    textDecoration: 'none'
                })}
            >
                인기 영화 목록 페이지로 이동
            </NavLink>

            <NavLink
                to="/movies/upcoming"
                style={({ isActive }) => ({
                    color: isActive ? 'green' : 'black',
                    textDecoration: 'none'
                })}
            >
                예정된 영화 목록 페이지로 이동
            </NavLink>
        </nav>
    );
};

export default Navbar;
