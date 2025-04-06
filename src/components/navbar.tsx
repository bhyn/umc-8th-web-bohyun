import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-2.5 p-2.5 bg-gray-100 text-xs text-center">
      <NavLink
        to="/movies/popular"
        className={({ isActive }) =>
          isActive ? "text-green-600 no-underline" : "text-black no-underline"
        }
      >
        인기 영화
      </NavLink>
      <NavLink
        to="/movies/upcoming"
        className={({ isActive }) =>
          isActive ? "text-green-600 no-underline" : "text-black no-underline"
        }
      >
        예정된 영화
      </NavLink>
      <NavLink
        to="/movies/top_rated"
        className={({ isActive }) =>
          isActive ? "text-green-600 no-underline" : "text-black no-underline"
        }
      >
        Top Rated
      </NavLink>
      <NavLink
        to="/movies/now_playing"
        className={({ isActive }) =>
          isActive ? "text-green-600 no-underline" : "text-black no-underline"
        }
      >
        Now Playing
      </NavLink>
    </nav>
  );
};

export default Navbar;
