import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Sidebar from "../components/Header/SidebarPage_Admin";

const PageSection = styled.div`
  .MainPage {
    width: 81%;
    margin-left: 18vw;
  }
`;

const HomeLayout = () => {
  return (
    <>
      <div>
        <header>
          <Header />
        </header>
        <Sidebar />
        <PageSection>
          <div className="MainPage">
            <Outlet />
          </div>
        </PageSection>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default HomeLayout;
