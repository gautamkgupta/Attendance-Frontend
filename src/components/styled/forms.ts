import styled from "styled-components";

export const BlueButton = styled.button`
  background: var(--blue);
  color: white;
  background-color: var(--blue);
  border-radius: 5px;
  border: 0px;
  &:active {
    transform: scale(0.98);
    background-color: white;
    color: var(--blue);
    border: 1px solid var(--blue);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const WhiteButton = styled.button`
  border: 1px solid var(--blue);
  background: white;
  border-radius: 5px;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const BlueInput = styled.input`
  width: 100%;
  border-radius: 5px;
  flex-grow: 1;
  padding: 0 5px;
  height: 48px;
  border: 2px solid var(--blue);
  font-size: 16px;
  @media (min-width: 425px) {
    height: 64px;
  }
`;

export const YellowButton = styled.button`

color: white;
background-color: #F6C35F;
border: 0px;
`;