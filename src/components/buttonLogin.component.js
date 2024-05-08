import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaSignOutAlt } from 'react-icons/fa'; // Importa os ícones do React Icons
import '../assets/css/buttonLogin.css';
import { PersonCircle } from 'react-bootstrap-icons';
import '../assets/css/dropdown.css'; // Importa o arquivo CSS do dropdown

export default function ButtonLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuthentication();
    const intervalId = setInterval(() => {
      checkAuthentication();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="user-dropdown">
      <div className="button-group"> {/* Adicionando um wrapper para os botões */}
        {isLoggedIn ? (
          <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="dropbtn"><PersonCircle size={20} color='#EDF2F4'/> Perfil</button>
            {dropdownVisible && (
              <div className="dropdown-content">
                <a href="/favorite"><FaHeart className="icon" /> Favoritos</a>
                <a href="#" onClick={handleLogout}><FaSignOutAlt className="icon" /> Logout</a>
              </div>
            )}
          </div>
        ) : (
          <button className="enter-button" onClick={() => navigate('/login')}>
            Entrar
          </button>
        )}
        <div className="space"></div> {/* Adicionando um espaço entre os botões */}
      </div>
    </div>
  );
}
