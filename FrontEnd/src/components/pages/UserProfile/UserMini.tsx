import { Avatar } from "antd";
import { Skeleton } from "@nextui-org/react";
import { styled } from "styled-components";

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin: 20px 0;
`;

function UserMini({
  userInfoData,
  collapsed,
}: {
  userInfoData: any;
  collapsed: boolean;
}) {
  return (
    <div>
      {userInfoData ? (
        <UserInfoWrapper>
          <Avatar
            style={{ transition: "0.2s" }}
            src={userInfoData.profileImg}
            size={collapsed ? 50 : 140}
          />
          {collapsed ? null : (
            <>
              <h3>
                <strong>{userInfoData.nickname}</strong>
              </h3>
              <p>{userInfoData.email}</p>
            </>
          )}
        </UserInfoWrapper>
      ) : collapsed ? (
        <div className="max-w-[100px] w-full">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
        </div>
      ) : (
        <>
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </>
      )}
    </div>
  );
}

export default UserMini;
