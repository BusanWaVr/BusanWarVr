import { useNavigate } from "react-router";
import { styled } from "styled-components";
import BusanBg from "../../../assets/busan_background.png";
import { EditOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useI18n } from "../../../hooks/useI18n";

const UserStateWrapper = styled.div`
  background-image: linear-gradient(
      rgba(20, 56, 94, 0.477),
      rgba(184, 218, 255, 0.2)
    ),
    url(${BusanBg});
  border-radius: 5px;
`;
const UserInfoWrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  height: 100%;
  padding: 25px;
`;
const UserInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UserInfoContent = styled.div`
  padding-left: 15px;
  text-align: left;
  margin: 20px 0;
  & p:nth-child(1) {
    color: #1983ff;
    font-weight: 600;
  }

  & p:nth-child(2) {
    font-size: 16px;
  }
`;

const GuideIntroduction = styled.div`
  height: 50px;
  width: 100%;
  background-color: #b8daff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const UserInfo = ({ userInfoData, isMe }) => {
  const t = useI18n();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/update");
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <UserStateWrapper className="w-full md:w-1/2"></UserStateWrapper>
      <div className="w-full md:w-1/2 md:pl-6">
        <UserInfoWrapper>
          <UserInfoHeader>
            <p className="font-bold">{t(`회원 정보`)}</p>
            {isMe ? (
              <Tooltip title="회원 정보 수정">
                <Button
                  type="link"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={handleClick}
                />
              </Tooltip>
            ) : (
              <></>
            )}
          </UserInfoHeader>
          <GuideIntroduction>
            {userInfoData.introduction
              ? userInfoData.introduction
              : "작성된 한 줄 소개가 없습니다."}
          </GuideIntroduction>
          <UserInfoContent>
            <p>{t(`이메일`)}</p>
            <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {userInfoData.email}
              <a
                href={`mailto: ${userInfoData.email}`}
                style={{ paddingBottom: "2px" }}
              >
                <MailOutlined />
              </a>
            </p>
          </UserInfoContent>
          <UserInfoContent>
            <p>{t(`닉네임`)}</p>
            <p>{userInfoData.nickname}</p>
          </UserInfoContent>
        </UserInfoWrapper>
      </div>
    </div>
  );
};

export default UserInfo;
