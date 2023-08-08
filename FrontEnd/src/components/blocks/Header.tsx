import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container, Button } from "react-bootstrap";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LoginModal from "../pages/Auth/LoginModal";
import Logo from "../../assets/logo.svg";

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function Header({ isLoggedIn, setIsLoggedIn }: Props) {
  const navigate = useNavigate();

  const [onLoginModal, setOnLoginModal] = useState(false);

  const onModalHandler = () => {
    setOnLoginModal(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    localStorage.removeItem("profileImg");
    localStorage.removeItem("userType");
    localStorage.removeItem("category");
    localStorage.removeItem("introduce");

    localStorage.removeItem("wishTour");
    if (localStorage) {
      localStorage.removeItem("introduction");
    }

    navigate("/");
    setIsLoggedIn(false);
  };

  const nickname = localStorage.getItem("nickname");
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={Logo}
              width="100"
              height="50"
              className="d-inline-block align-center"
            />{" "}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/tour">
              투어 게시판
            </Nav.Link>
            <Nav.Link as={Link} to="/mate">
              메이트 모집
            </Nav.Link>
            <Nav.Link as={Link} to="/livestream">
              스트리밍 테스트
            </Nav.Link>
            {isLoggedIn && userType === "GUIDE" ? (
              <Nav.Link as={Link} to="/tour/write">
                투어 개설
              </Nav.Link>
            ) : null}
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <>
                {userType === "USER" ? (
                  <Nav.Link as={Link} to={`/user/${userId}/mypage`}>
                    {nickname}
                  </Nav.Link>
                ) : userType === "GUIDE" ? (
                  <Nav.Link as={Link} to={`/guide/${userId}/mypage`}>
                    {nickname}
                  </Nav.Link>
                ) : null}
                <Button onClick={logout}>로그아웃</Button>
              </>
            ) : (
              <Button onClick={onModalHandler}>로그인</Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {onLoginModal ? (
        <LoginModal
          setOnLoginModal={setOnLoginModal}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : null}
    </>
  );
}

export default Header;
