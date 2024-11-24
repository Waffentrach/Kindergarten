import { Link, useLocation } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const location = useLocation(); 

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Головна
          </Link>
        </li>
        <li>
          <Link to="/attendance" className={location.pathname === "/attendance" ? "active" : ""}>
            Відвідування
          </Link>
        </li>
        <li>
          <Link to="/history" className={location.pathname === "/history" ? "active" : ""}>
            Історія відвідувань
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={location.pathname === "/statistics" ? "active" : ""}>
            Статистика
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
