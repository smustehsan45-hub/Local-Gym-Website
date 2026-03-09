import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useState } from "react";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <style>{`
        nav.navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: white;
          border-bottom: 1px solid #ddd;
          position: relative;
          z-index: 1000;
        }

        .right-side ul {
          display: flex;
          list-style: none;
          gap: 20px;
          padding: 0;
          margin: 0;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background-color: black;
          border-radius: 2px;
        }

        /* MOBILE STYLE */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .right-side {
            display: none;
            position: absolute;
            top: 70px;
            right: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }

          .right-side.open {
            display: flex;
            flex-direction: column;
          }

          .right-side ul {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="left-side">
          <NavLink to="/">
            <img
              src="/images/logo-removebg-preview.png"
              alt="logo"
              style={{ height: "60px", display: "block" }}
            />
          </NavLink>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`right-side ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><NavLink to="/" onClick={toggleMenu}>Home</NavLink></li>
            <li><NavLink to="/booking" onClick={toggleMenu}>Booking</NavLink></li>
            <li><NavLink to="/service" onClick={toggleMenu}>Services</NavLink></li>
            <li><NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink></li>
            {isLoggedIn ? (
              <li><NavLink to="/logout" onClick={toggleMenu}>Logout</NavLink></li>
            ) : (
              <>
                <li><NavLink to="/register" onClick={toggleMenu}>Register</NavLink></li>
                <li><NavLink to="/login" onClick={toggleMenu}>Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
