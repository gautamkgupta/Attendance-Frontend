import styled from "styled-components";
import call from "@/assets/call.png";

export const PhoneIcon = styled.div`
  &:before {
    content: "";
    width: 24px;
    height: 24px;
    position: relative;
    display: inline-block;
    background: url(${call}) no-repeat;
    top: 6px;
    left: -5px;
  }
`;
