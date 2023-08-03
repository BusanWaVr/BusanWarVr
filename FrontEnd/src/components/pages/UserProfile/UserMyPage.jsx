import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserMini from "./UserMini";
import styled from "styled-components";


const Wrapper = styled.div`
display: flex;
margin: auto;
  width: 70%;
  // background-color: #343434;
`;

const NavbarWrapper = styled.div`
  width: 30%;
  // background-color: #505050;
`;

const OutletWrapper = styled.div`
  width: 70%;
  // background-color: #808080;
`;


function UserMyPage() {
  return (
    <Wrapper>
      <NavbarWrapper>
        <UserMini />
        <UserNavbar />
      </NavbarWrapper>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </Wrapper>
  );
}

export default UserMyPage;
