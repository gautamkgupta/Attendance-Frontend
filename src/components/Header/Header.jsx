import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import cart from "../../assets/images/TYS/cart.png";
// import { getCart } from "../../features/web/web-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import Login from "../../pages/Auth/Login";
import userIcon from "../../assets/images/TYS/user.png";
import { Button, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  #NavBar {
    height: 10vh;
  }
`;

function Header() {
  const userInfo =
    localStorage.getItem("email") !== "undefined"
      ? localStorage.getItem("email")
      : null;
  let isUserLoggedIn = null;
  if (userInfo) {
    // const userData = JSON.parse(userInfo);
    isUserLoggedIn = userInfo;
  }

  // const dispatch = useDispatch();
  // const cartCount = useSelector((state) => state.cart.data?.count || []);
  // useEffect(() => {
  //   dispatch(getCart()).catch((error) => console.error("Error:", error));
  // }, [dispatch]);

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  const menu = (
    <Menu>
      {/* <Menu.Item key="1">
        <a href="/auth/profile">My Profile</a>
      </Menu.Item> */}
      <Menu.Item key="2" onClick={logoutHandler}>
        <a href="/auth/login">Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Navbar expand="lg" id="NavBar" className="m-0">
      <Container>
        <Navbar.Brand href="/">
          {/* <img src={logo} alt="" width="130" height="55" /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100%" }}
            navbarScroll
          >
            {isUserLoggedIn ? (
              <>
                {/* <p>welcome {isUserLoggedIn}</p> */}
                <Dropdown overlay={menu} placement="bottomRight">
                  <Button className="border-0 pt-2">
                    {" "}
                    <img src={userIcon} width={25} alt="" />
                  </Button>
                </Dropdown>
              </>
            ) : (
              <div>{/* <Login /> */}</div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
