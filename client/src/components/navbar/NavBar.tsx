import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth.service';
import logo from '../../assets/logo.png';
import './style.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => { 
    try {
      await logout(); 
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="logo" width="40" height="40" className="d-inline-block align-text-top"/>
          WordBox
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={'#'} onClick={handleLogout} className="btn btn-secondary">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
