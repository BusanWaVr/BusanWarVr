import react from "react";

function UserMini({ userInfoData }) {
  return (
    <div>
      {userInfoData ? (
        <div>
          <img
            src={userInfoData.profileImg}
            alt="프로필 이미지"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
            }}
          />
          <h3>
            <strong>{userInfoData.nickname}</strong>
          </h3>
          <p>팔로잉 : {userInfoData.followingNum}</p>
        </div>
      ) : (
        <p>로딩중ㅎ</p>
      )}
    </div>
  );
}

export default UserMini;
