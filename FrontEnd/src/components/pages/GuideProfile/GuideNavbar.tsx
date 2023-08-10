import React from "react";
import { Link, useParams } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  RocketOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

function GuideNavbar() {
  const { urlId } = useParams();

  const items: MenuProps["items"] = [
    {
      label: <Link to={`/guide/${urlId}/mypage/`}>회원 정보</Link>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: <Link to={`/guide/${urlId}/mypage/follower`}>팔로워</Link>,
      key: "2",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={`/guide/${urlId}/mypage/tour`}>개설한 투어</Link>,
      key: "3",
      icon: <RocketOutlined />,
    },
  ];

  return (
    <Menu
      theme="light"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
}

export default GuideNavbar;
