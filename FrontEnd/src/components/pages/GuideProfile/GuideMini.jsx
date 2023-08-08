import FollowBtn from "../../blocks/FollowBtn.jsx";

function GuideMini({ guideInfoData }) {
  const handleButtonClick = () => {
    this.forceUpdate();
  };

  return (
    <div>
      {guideInfoData ? (
        <div>
          <img
            src={guideInfoData.profileImg}
            alt="프로필 이미지"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
            }}
          />
          <h3>
            <strong>{guideInfoData.nickname}</strong>
          </h3>
          <FollowBtn
            onClick={handleButtonClick}
            guideInfoData={guideInfoData}
          />
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default GuideMini;
