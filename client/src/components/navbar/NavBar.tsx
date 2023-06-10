import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth.service';

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
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <span className="fs-4">WordBox</span>
      </div>
      <ul className="nav nav-pills">
        {
          <li className="nav-item">
            <Link to={'#'} onClick={handleLogout} className="nav-link active">Logout</Link>
          </li>
        }
      </ul>
    </header>
  )
}

export default NavBar;
