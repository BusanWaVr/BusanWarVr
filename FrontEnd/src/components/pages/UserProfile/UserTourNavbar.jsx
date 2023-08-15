import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../../hooks/useI18n"

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

function UserTourNavbar() {
  const t = useI18n()
  const { userId } = useParams();

  return (
    <NavContainer>
      <ul>
        <li>
          <StyledNavLink
            exact="true"
            to={`/user/${userId}/mypage/tour`}
            activeclassname="active"
          >
            {t(`예정된 투어`)}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            to={`/user/${userId}/mypage/tour/ended`}
            activeclassname="active"
          >
            {t(`지난 투어`)}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            to={`/user/${userId}/mypage/tour/canceled`}
            activeclassname="active"
          >
            {t(`취소된 투어`)}
          </StyledNavLink>
        </li>
      </ul>
    </NavContainer>
  );
}

export default UserTourNavbar;
