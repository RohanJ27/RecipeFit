import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { auth, setAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const handleDarkModeToggle = () => {
    
    if (document.body.style.filter != 'invert(100%) hue-rotate(180deg)')
    {
      document.body.style.filter = 'invert(100%) hue-rotate(180deg)';
      document.getElementById("togTex").innerText = "Dark";
    }
    else
    {
      
      document.body.style.filter = 'none';
      document.getElementById("togTex").innerText = "Light";
    }
    


  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">RecipeFit</Link>
      </div>
      <div class="toggle-container">
        <label class="switch">
          <input type="checkbox" 
            class = "colorTrans"
            onClick={handleDarkModeToggle} 
            />
          <span class="slider round"></span>
        </label>
        
      </div>
      <p class="toggleText" id ="togTex">Light</p>
      <div className="nav-links">
        <Link to="/search" className="nav-link">Search Recipes</Link>
        {auth ? (
          <>
            <Link to="/profile" className="nav-link">Account Details</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;