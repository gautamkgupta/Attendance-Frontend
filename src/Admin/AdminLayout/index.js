import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import styled from "styled-components";

const StyledContainer = styled.div`
.adminHead{
  display: flex;
  align-items: center;
}
.adminMainDiv{
  width: 100%;
  padding: 2rem;
  margin-top: 5em;
  height: 87vh;
  overflow: auto;
  background: rgb(245, 245, 245);
}
`;
const HomeLayout = () => {
  return (
    <StyledContainer>
      <div className="adminHead">
        <header>
          <AdminSidebar />
        </header>
        <div className="adminMainDiv" >
        <Outlet />
        </div>
      </div>
        {/* <AdminFooter /> */}
    </StyledContainer>
  );
};

export default HomeLayout;
