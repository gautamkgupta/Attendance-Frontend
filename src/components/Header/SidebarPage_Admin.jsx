import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/images/TYS/TYS_Logo.jpg";
import { BsPeople } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const SidebarSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? "250px" : "80px")};
  height: 100%;
  background-color: white;
  color: orange;
  overflow-y: auto;
  padding-top: 60px;
  transition: width 0.3s ease;
  z-index: 100;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? "200px" : "60px")};
  }

  @media (max-width: 576px) {
    width: ${({ isOpen }) => (isOpen ? "150px" : "50px")};
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  font-size: 18px;
  border-bottom: 1px solid #34495e;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #dccece;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 15px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
    padding: 8px 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: orange;
  font-weight: 500;
  margin-left: 10px;

  @media (max-width: 768px) {
    margin-left: 5px;
  }

  @media (max-width: 576px) {
    margin-left: 3px;
  }
`;

const SidebarIcon = styled.div`
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 5px;
  }

  @media (max-width: 576px) {
    margin-right: 3px;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: ${({ isOpen }) => (isOpen ? "220px" : "50px")};
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background-color: #34495e;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease;

  @media (max-width: 768px) {
    left: ${({ isOpen }) => (isOpen ? "180px" : "40px")};
  }

  @media (max-width: 576px) {
    left: ${({ isOpen }) => (isOpen ? "130px" : "30px")};
  }
`;

const ToggleIcon = styled.span`
  color: white;
  font-size: 20px;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

const MainContent = styled.div`
  margin-left: ${({ isOpen }) => (isOpen ? "250px" : "80px")};
  transition: margin-left 0.3s ease;
  padding: 20px;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: ${({ isOpen }) => (isOpen ? "200px" : "60px")};
  }

  @media (max-width: 576px) {
    margin-left: ${({ isOpen }) => (isOpen ? "150px" : "50px")};
  }
`;

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <SidebarSection isOpen={isOpen} className="d-flex flex-column">
        <SidebarHeader>
          <Logo src={logo} alt="Logo" />
        </SidebarHeader>
        <SidebarNav className="nav flex-column">
          <SidebarNavItem>
            <div className="d-flex align-items-center">
              <SidebarIcon>
                <BsPeople />
              </SidebarIcon>
              {isOpen && <StyledLink to="/admin">Dashboard</StyledLink>}
            </div>
          </SidebarNavItem>
          <SidebarNavItem>
            <div className="d-flex align-items-center">
              <SidebarIcon>
                <BsPeople />
              </SidebarIcon>
              {isOpen && (
                <StyledLink to="/admin/attendance">Attendance</StyledLink>
              )}
            </div>
          </SidebarNavItem>
          <SidebarNavItem>
            <div className="d-flex align-items-center">
              <SidebarIcon>
                <BsPeople />
              </SidebarIcon>
              {isOpen && (
                <StyledLink to="/admin/reimbursement">
                  Regularization
                </StyledLink>
              )}
            </div>
          </SidebarNavItem>
          <SidebarNavItem>
            <div className="d-flex align-items-center">
              <SidebarIcon>
                <BsPeople />
              </SidebarIcon>
              {isOpen && (
                <StyledLink to="/admin/manage_Leave">Manage Leave</StyledLink>
              )}
            </div>
          </SidebarNavItem>
          <SidebarNavItem>
            <div className="d-flex align-items-center">
              <SidebarIcon>
                <BsPeople />
              </SidebarIcon>
              {isOpen && (
                <StyledLink to="/admin/resignation">Resignation</StyledLink>
              )}
            </div>
          </SidebarNavItem>
          <SidebarNavItem>
            <div className="d-flex align-items-center">
              <SidebarIcon>
                <BsPeople />
              </SidebarIcon>
              {isOpen && <StyledLink to="/admin/user">User</StyledLink>}
            </div>
          </SidebarNavItem>
          <SidebarNavItem>
            <div className="d-flex align-items-center">
              <SidebarIcon>
                <BsPeople />
              </SidebarIcon>
              {isOpen && (
                <StyledLink to="/admin/notification">Notification</StyledLink>
              )}
            </div>
          </SidebarNavItem>
          <SidebarNavItem>
            <div className="d-flex align-items-center">
              <SidebarIcon>
                <BsPeople />
              </SidebarIcon>
              {isOpen && <StyledLink to="/admin/holiday">Holidays</StyledLink>}
            </div>
          </SidebarNavItem>
        </SidebarNav>
        <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
          <ToggleIcon isOpen={isOpen}>{isOpen ? "◄" : "►"}</ToggleIcon>
        </ToggleButton>
      </SidebarSection>
      <MainContent isOpen={isOpen}>{children}</MainContent>
    </Container>
  );
};

export default Sidebar;
