import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/images/TYS/TYS_Logo.jpg";
import { BsPeople, BsChevronDown, BsChevronRight } from "react-icons/bs";

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

const Submenu = styled.ul`
  list-style: none;
  padding: 0;
  padding-left: 20px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  @media (max-width: 768px) {
    padding-left: 15px;
  }

  @media (max-width: 576px) {
    padding-left: 10px;
  }
`;

const SubmenuItem = styled.li`
  padding: 10px 0;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 0;
  }

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 6px 0;
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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  return (
    <SidebarSection isOpen={isOpen} className="d-flex flex-column">
      <SidebarHeader>
        <Logo src={logo} alt="Logo" />
      </SidebarHeader>
      <SidebarNav className="nav flex-column">
        <SidebarNavItem onClick={() => toggleSubmenu("dashboard")}>
          <div className="d-flex align-items-center">
            <SidebarIcon>
              <BsPeople />
            </SidebarIcon>
            {isOpen && <StyledLink>Dashboard</StyledLink>}
          </div>
          <SidebarIcon>
            {isOpen ? (
              activeSubmenu === "dashboard" ? (
                <BsChevronDown />
              ) : (
                <BsChevronRight />
              )
            ) : (
              <BsChevronRight />
            )}
          </SidebarIcon>
        </SidebarNavItem>
        <Submenu isOpen={activeSubmenu === "dashboard"}>
          <SubmenuItem>
            <StyledLink to="/">Biometric</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/overview">Overview</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/attendance">Attendance</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/regularization">Regularization</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/leave_status">Leave Status</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/task_list">Task List</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/timesheet">Timesheet</StyledLink>
          </SubmenuItem>
        </Submenu>

        <SidebarNavItem onClick={() => toggleSubmenu("profile")}>
          <div className="d-flex align-items-center">
            <SidebarIcon>
              <BsPeople />
            </SidebarIcon>
            {isOpen && <StyledLink>Profile</StyledLink>}
          </div>
          <SidebarIcon>
            {isOpen ? (
              activeSubmenu === "profile" ? (
                <BsChevronDown />
              ) : (
                <BsChevronRight />
              )
            ) : (
              <BsChevronRight />
            )}
          </SidebarIcon>
        </SidebarNavItem>
        <Submenu isOpen={activeSubmenu === "profile"}>
          <SubmenuItem>
            <StyledLink to="/profile/myprofile">View Profile</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/profile/identitycard">Identity Card</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/profile/resume">Get Resume</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/profile/reimbursement">Reimbursement</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/profile/resign">Apply Resign</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/profile/tasklist">Task List</StyledLink>
          </SubmenuItem>
          <SubmenuItem>
            <StyledLink to="/profile/timesheet">Timesheet</StyledLink>
          </SubmenuItem>
        </Submenu>

        <SidebarNavItem>
          <div className="d-flex align-items-center">
            <SidebarIcon>
              <BsPeople />
            </SidebarIcon>
            {isOpen && <StyledLink to="/holiday">Holidays</StyledLink>}
          </div>
        </SidebarNavItem>
      </SidebarNav>
      <ToggleButton
        isOpen={isOpen}
        onClick={toggleSidebar}
        className="btn btn-dark"
      >
        <ToggleIcon isOpen={isOpen}>{isOpen ? "◄" : "►"}</ToggleIcon>
      </ToggleButton>
    </SidebarSection>
  );
};

export default Sidebar;
