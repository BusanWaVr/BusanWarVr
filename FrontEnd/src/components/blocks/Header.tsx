import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../hooks/useI18n"
import LangeBtn from "./LangBtn"

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
  const t = useI18n()
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

  const nickname = localStorage.getItem("nickname");
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const profileImg = localStorage.getItem("profileImg");
  const email = localStorage.getItem("email");

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
              {t(`투어 검색`)}
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/mate" className="text-sm">
            {t(`메이트 모집`)}
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/livestream" className="text-sm">
              {t(`스트리밍 테스트`)}
            </Link>
          </NavbarItem>
          {isLoggedIn && userType === "GUIDE" ? (
            <NavbarItem>
              <Link href="/tour/write" color="foreground" className="text-sm">
              {t(`투어 개설`)}
              </Link>
            </NavbarItem>
          ) : null}
        </NavbarContent>

        {/* 다국어 버튼 */}
        <NavbarContent justify="end">
          <LangeBtn />
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
                    name={nickname}
                    size="sm"
                    src={profileImg}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <Link
                      href={
                        userType === "USER"
                          ? `/user/${userId}/mypage`
                          : `/guide/${userId}/mypage`
                      }
                      className="flex-col text-left items-start"
                    >
                      <p className="font-bold text-sm">{nickname}</p>
                      <p className="font-semibold text-sm text-left">
                        {email}
                      </p>
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    {userType === "USER" ? (
                      <Link
                        href={`/user/${userId}/mypage/tour`}
                        className="text-sm text-slate-600"
                      >
                        {t(`나의 투어 목록`)}
                      </Link>
                    ) : (
                      <Link
                        href={`/guide/${userId}/mypage/tour`}
                        className="text-sm text-slate-600"
                      >
                        {t(`개설한 투어 목록`)}
                      </Link>
                    )}
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={logout}>
                  {t(`로그아웃`)}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <NavbarItem>
              <Button onPress={onModalHandler} color="primary" variant="flat">
              {t(`로그인`)}
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu className="gap-10">
          <NavbarMenuItem>
            <Link color="foreground" href="/tour" className="w-full" size="lg">
            {t(`투어 검색`)}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link color="foreground" href="/mate" className="w-full" size="lg">
            {t(`메이트 모집`)}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              color="foreground"
              href="/livestream"
              className="w-full"
              size="lg"
            >
              {t(`스트리밍 테스트`)}
            </Link>
          </NavbarMenuItem>
          {isLoggedIn && userType === "GUIDE" ? (
            <NavbarMenuItem>
              <Link
                href="/tour/write"
                color="foreground"
                className="w-full"
                size="lg"
              >
                {t(`투어 개설`)}
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
}

export default Header;
