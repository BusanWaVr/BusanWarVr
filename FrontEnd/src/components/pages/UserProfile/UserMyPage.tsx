import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import { Layout } from "antd";

const { Content, Sider } = Layout;

import UserMini from "./UserMini";
import UserNavbar from "./UserNavbar";
import { toast } from "react-toastify";

const UserMyPageLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [userInfoData, setUserInfoData] = useState(null);
  const [isMe, setIsMe] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    const localUserId = localStorage.getItem("userId");

    if (userId === localUserId) {
      setIsMe(true);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://busanwavrserver.store/user/userInfo/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setUserInfoData(data.data);
        } else {
          toast.error(
            "유저데이터를 받아올 수 없습니다. 잠시 후 다시 시도해 주세요."
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Layout style={{ height: "calc(100vh - 5rem )" }}>
      <Sider
        style={{ height: "calc(100vh - 5rem )" }}
        theme="light"
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <UserMini userInfoData={userInfoData} collapsed={collapsed} />
        <UserNavbar />
      </Sider>
      <Layout style={{ height: "calc(100vh - 4.3rem)", overflowY: "scroll" }}>
        <Content style={{ margin: "0 16px" }}>
          <Outlet context={{ userInfoData, isMe }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserMyPageLayout;
