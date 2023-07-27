import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container, Button } from "react-bootstrap";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginModal from "../auth/LoginModal";
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
    navigate("/");
    setIsLoggedIn(false);
  };

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
            <Nav.Link href="/test">부산 여행지</Nav.Link>
            <Nav.Link href="/test">투어 메이트</Nav.Link>
            <Nav.Link href="/livestream">스트리밍 테스트</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <Button onClick={logout}>로그아웃</Button>
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
