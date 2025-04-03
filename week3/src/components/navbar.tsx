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
            <NavLink to="/movies/popular" style={({ isActive }) => ({
                    color: isActive ? 'green' : 'black',
                    textDecoration: 'none'
                })}>인기 영화</NavLink>
<NavLink to="/movies/upcoming" style={({ isActive }) => ({
                    color: isActive ? 'green' : 'black',
                    textDecoration: 'none'
                })}> 예정된 영화</NavLink>
<NavLink to="/movies/top_rated" style={({ isActive }) => ({
                    color: isActive ? 'green' : 'black',
                    textDecoration: 'none'
                })}>Top Rated</NavLink>
<NavLink to="/movies/now_playing" style={({ isActive }) => ({
                    color: isActive ? 'green' : 'black',
                    textDecoration: 'none'
                })}> Now Playing</NavLink>
        </nav>
    );
};

export default Navbar;
