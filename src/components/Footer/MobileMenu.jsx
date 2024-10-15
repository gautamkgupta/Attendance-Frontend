import React from 'react';
import styled from 'styled-components';
import img1 from '../../assets/images/house.png'
import img2 from '../../assets/images/pet-food.png'
import img3 from '../../assets/images/grooming2.png'
const StyledContainer = styled.div`
.mobile-bottom-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    display: none; 
    & ul{
        display: flex;
        justify-content: space-around;
        list-style: none;
        padding: 0px;
        margin-bottom: -1.5em;
        & li{
            text-align: center;
        }
    }
  }
  
  @media only screen and (max-width: 768px) {
    .mobile-bottom-menu {
      display: block; 
      z-index: 1000;
    }
  }
  
`;
const MobileBottomMenu = () => {
  return (
    <StyledContainer>
     <div className="mobile-bottom-menu">
      <ul>
        <li><a href="/"><img src={img1} alt="" /><p>Home</p></a></li>
        <li><a href="/services"><img src={img3} alt="" /><p>Services</p></a></li>
        <li><a href="/products"><img src={img2} alt="" /><p>Products</p></a></li>
      </ul>
    </div>
    </StyledContainer>
  );
};

export default MobileBottomMenu;
