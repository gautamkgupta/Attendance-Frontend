import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import logo from '../../assets/images/PetSide-Logo-v2.png'

const StyledContainer = styled.div`
  .sidebar {
    width: 225px;
    display: flex;
    align-items: baseline;
    height: 100vh;
    overflow: auto;
    padding-top: 6em;
    & ul {
      & .nav-link {
        color: #55C8DB;
        font-weight: 800!important;
        width: 180px;
        text-align: left;
        transition: background 0.3s ease;
        margin-bottom: 5px;
      }
      & .nav-link:hover {
        background: rgb(245, 245, 245);
        text-decoration: none;
        border-radius: 5px;
        color: #114c5f;
      }
      & .active {
        background: rgb(245, 245, 245);
        border-radius: 5px;
        color: #114c5f;
      }
    }
  }
`;

function AdminSidebar({ children }) {
  const [selectedLink, setSelectedLink] = useState(null);

  const handleNavLinkClick = (index) => {
    setSelectedLink(index);
  };

  return (
    <StyledContainer>
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar fixed-top bg-body-light">
            <div className="container-fluid">
              <img
                src={logo}
                className="img-fluid rounded-top"
                alt=""
              />
              <Link to="#logout" className="nav-link">Logout</Link>
            </div>
          </nav>
          {/* Sidebar */}
          <div className="col-md-3 sidebar bg-body-light">
            <ul className="nav">
              <li className="nav-item">
                <Link
                  to="/admin/dashboard"
                  className={`nav-link ${selectedLink === 0 ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick(0)}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/users"
                  className={`nav-link ${selectedLink === 1 ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick(1)}
                >
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/service"
                  className={`nav-link ${selectedLink === 2 ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick(2)}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/service/booking"
                  className={`nav-link ${selectedLink === 3 ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick(3)}
                >
                  Services Booking
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/product"
                  className={`nav-link ${selectedLink === 4 ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick(4)}
                >
                  Product
                </Link>
              </li>
            </ul>
          </div>
          {/* Main content area */}
          <div className="col-md-9 content">
            {/* Render children components (routes) */}
            {children}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}

export default AdminSidebar;
