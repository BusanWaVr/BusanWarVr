import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container, Button } from "react-bootstrap";

import Logo from "../assets/logo.svg"

function Header() {
  return (
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
          <Nav.Link href="/test">후기 게시판</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Button>로그인</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
