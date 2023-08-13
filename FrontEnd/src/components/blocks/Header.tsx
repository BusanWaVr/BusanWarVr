import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

import LoginModal from "../pages/Auth/LoginModal";
import LogoBlueBig from "../../assets/logo-blue__big.png";

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function Header({ isLoggedIn, setIsLoggedIn }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [onLoginModal, setOnLoginModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const onModalHandler = () => {
    console.log("클릭");
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

    setIsLoggedIn(false);
  };

  useEffect(() => {
    setUserInfo({
      nickname: localStorage.getItem("nickname"),
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
      profileImg: localStorage.getItem("profileImg"),
      email: localStorage.getItem("email"),
    });
  }, [localStorage]);

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/">
              <img
                src={LogoBlueBig}
                alt="부산와Vr"
                style={{ height: "20px" }}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-8" justify="start">
          <NavbarItem>
            <Link color="foreground" href="/tour" className="text-sm">
              투어 검색
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/mate" className="text-sm">
              메이트 모집
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/livestream" className="text-sm">
              스트리밍 테스트
            </Link>
          </NavbarItem>
          {isLoggedIn && userInfo.userType === "GUIDE" ? (
            <NavbarItem>
              <Link href="/tour/write" color="foreground" className="text-sm">
                투어 개설
              </Link>
            </NavbarItem>
          ) : null}
        </NavbarContent>

        <NavbarContent justify="end">
          {isLoggedIn ? (
            <>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    style={{ padding: 0 }}
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={userInfo.nickname}
                    size="sm"
                    src={userInfo.profileImg}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <Link
                      href={
                        userInfo.userType === "USER"
                          ? `/user/${userInfo.userId}/mypage`
                          : `/guide/${userInfo.userId}/mypage`
                      }
                      className="flex-col text-left items-start"
                    >
                      <p className="font-bold text-sm">{userInfo.nickname}</p>
                      <p className="font-semibold text-sm text-left">{userInfo.email}</p>
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    {userInfo.userType === "USER" ? (
                      <Link
                        href={`/user/${userInfo.userId}/mypage/tour`}
                        className="text-sm text-slate-600"
                      >
                        나의 투어 목록
                      </Link>
                    ) : (
                      <Link
                        href={`/guide/${userInfo.userId}/mypage/tour`}
                        className="text-sm text-slate-600"
                      >
                        개설한 투어 목록
                      </Link>
                    )}
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={logout}>
                    로그아웃
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <NavbarItem>
              <Button onPress={onModalHandler} color="primary" variant="flat">
                로그인
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu className="gap-10">
          <NavbarMenuItem>
            <Link color="foreground" href="/tour" className="w-full" size="lg">
              투어 검색
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link color="foreground" href="/mate" className="w-full" size="lg">
              메이트 모집
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              color="foreground"
              href="/livestream"
              className="w-full"
              size="lg"
            >
              스트리밍 테스트
            </Link>
          </NavbarMenuItem>
          {isLoggedIn && userInfo.userType === "GUIDE" ? (
            <NavbarMenuItem>
              <Link
                href="/tour/write"
                color="foreground"
                className="w-full"
                size="lg"
              >
                투어 개설
              </Link>
            </NavbarMenuItem>
          ) : null}
        </NavbarMenu>
      </Navbar>
      {onLoginModal ? (
        <LoginModal
          setOnLoginModal={setOnLoginModal}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : null}
    </>
  );

  // return (
  //   <>
  //     <Navbar className="bg-body-tertiary" style={{ zIndex: "999" }}>
  //       <Container>
  //         <Navbar.Brand href="/">
  //           <img
  //             alt=""
  //             src={Logo}
  //             width="100"
  //             height="50"
  //             className="d-inline-block align-center"
  //           />{" "}
  //         </Navbar.Brand>
  //         <Nav className="me-auto">
  //           <Nav.Link as={Link} to="/tour">
  //             투어 게시판
  //           </Nav.Link>
  //           <Nav.Link as={Link} to="/mate">
  //             메이트 모집
  //           </Nav.Link>
  //           <Nav.Link as={Link} to="/livestream">
  //             스트리밍 테스트
  //           </Nav.Link>
  //           {isLoggedIn && userType === "GUIDE" ? (
  //             <Nav.Link as={Link} to="/tour/write">
  //               투어 개설
  //             </Nav.Link>
  //           ) : null}
  //         </Nav>
  //         <Navbar.Collapse className="justify-content-end">
  // {isLoggedIn ? (
  //   <>
  //     {userType === "USER" ? (
  //       <Nav.Link as={Link} to={`/user/${userId}/mypage`}>
  //         {nickname}
  //       </Nav.Link>
  //     ) : userType === "GUIDE" ? (
  //       <Nav.Link as={Link} to={`/guide/${userId}/mypage`}>
  //         {nickname}
  //       </Nav.Link>
  //     ) : null}
  //     <Button onClick={logout}>로그아웃</Button>
  //   </>
  // ) : (
  //   <Button onClick={onModalHandler}>로그인</Button>
  // )}
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>
  //     {onLoginModal ? (
  //       <LoginModal
  //         setOnLoginModal={setOnLoginModal}
  //         setIsLoggedIn={setIsLoggedIn}
  //       />
  //     ) : null}
  //   </>
  // );
}

export default Header;
