import { Link, useParams } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  RocketOutlined,
  HeartOutlined,
  UsergroupAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useI18n } from "../../../hooks/useI18n"

function UserNavbar() {
  const t = useI18n()
  const { userId } = useParams();

  const items: MenuProps["items"] = [
    {
      label: <Link to={`/user/${userId}/mypage/`}>{t(`회원 정보`)}</Link>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: <Link to={`/user/${userId}/mypage/tour`}>{t(`투어 리스트`)}</Link>,
      key: "2",
      icon: <RocketOutlined />,
    },
    {
      label: <Link to={`/user/${userId}/mypage/wish`}>{t(`위시리스트`)}</Link>,
      key: "3",
      icon: <HeartOutlined />,
    },
    {
      label: <Link to={`/user/${userId}/mypage/following`}>{t(`팔로잉 가이드`)}</Link>,
      key: "4",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={`/user/${userId}/mypage/review`}>{t(`작성한 리뷰`)}</Link>,
      key: "5",
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

export default UserNavbar;
