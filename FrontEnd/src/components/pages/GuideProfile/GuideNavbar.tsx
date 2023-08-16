import React from "react";
import { Link, useParams } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  RocketOutlined,
  UsergroupAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

import { useI18n } from "../../../hooks/useI18n"

function GuideNavbar() {
  const t = useI18n()
  const { urlId } = useParams();

  const items: MenuProps["items"] = [
    {
      label: <Link to={`/guide/${urlId}/mypage/`}>{t(`회원 정보`)}</Link>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: <Link to={`/guide/${urlId}/mypage/follower`}>{t(`팔로워`)}</Link>,
      key: "2",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={`/guide/${urlId}/mypage/tour`}>{t(`개설한 투어`)}</Link>,
      key: "3",
      icon: <RocketOutlined />,
    },
    {
      label: <Link to={`/guide/${urlId}/mypage/review`}>{t(`리뷰 목록`)}</Link>,
      key: "4",
      icon: <FormOutlined />,
    },
  ];

  return (
    <Menu
      theme="light"
      mode="inline"
      items={items}
    />
  );
}

export default GuideNavbar;
