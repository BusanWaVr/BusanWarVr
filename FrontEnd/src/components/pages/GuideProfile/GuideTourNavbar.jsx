import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  // background-color: #454545;

  ul {
    list-style: none;
  }

  li {
    display: inline;
    margin-right: 20px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &.active {
    font-weight: bold;
  }
`;

function GuideTourNavbar() {
  const { urlId } = useParams();
  return (
    <NavContainer>
      <ul>
        <li>
          <StyledNavLink
            exact="true"
            to={`/guide/${urlId}/mypage/tour/`}
            activeClassName="active"
          >
            예정된 투어
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            to={`/guide/${urlId}/mypage/tour/ended`}
            activeClassName="active"
          >
            지난 투어
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            to={`/guide/${urlId}/mypage/tour/canceled`}
            activeClassName="active"
          >
            취소된 투어
          </StyledNavLink>
        </li>
      </ul>
    </NavContainer>
  );
}

export default GuideTourNavbar;
