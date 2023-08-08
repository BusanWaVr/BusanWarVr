import NotPresentMember from "../../../../assets/boogie_notPresent.jpg";
import { styled } from "styled-components";

const CurrentMate = (tourData, joiners) => {
  const MateList = styled.ul`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  `;
  const MateDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    width: 150px;
    height: 200px;
    & > img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    & > .join-date {
      font-size: 14px;
      color: #93939e;
    }
  `;

  const formatDate = (date: Date) => {
    const newDate =
      date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
    return newDate;
  };

  return (
    <>
      <div>
        {tourData.joiners.length > 0 ? (
          <div>
            <p>
              총 <strong>{tourData.tourData.maxMember}</strong>명 중{" "}
              <strong>{tourData.joiners.length}</strong>명이 모였어요.
            </p>
            <div>
              <MateList>
                {tourData.joiners.map((joiner, index) => (
                  <MateDiv key={index}>
                    <img src={joiner.profileImage} alt="프로필 이미지" />
                    <div>
                      <strong>{joiner.nickname}</strong> 님
                    </div>
                    <div className="join-date">
                      {formatDate(new Date(joiner.joinDate))} 참여
                    </div>
                  </MateDiv>
                ))}
                {Array.from(
                  {
                    length:
                      tourData.tourData.maxMember - tourData.joiners.length,
                  },
                  (_, index) => (
                    <MateDiv key={index + tourData.joiners.length}>
                      <img src={NotPresentMember} alt="프로필 이미지" />
                      <div>모집 대기 중</div>
                    </MateDiv>
                  )
                )}
              </MateList>
            </div>
          </div>
        ) : (
          <p>참가자가 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default CurrentMate;
