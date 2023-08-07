import { Link } from "react-router-dom";
import TourDetailCourse from "./TourDetailCourse";

const TourDetailContent = ({tourData, joiners}) => {
  return (
    <>
      <p>제목 : {tourData.title}</p>
      <p>부제 : {tourData.subTitle}</p>
      <div>
        <p>
          가이드 :
          <Link to={`/guide/${tourData.userId}/mypage`}>
            <img src={tourData.profileImg} alt="" />
            {tourData.nickname}
          </Link>
        </p>
        <p>
          {tourData.category.map((c) => (
            <span>{c} </span>
          ))}
        </p>
        <p>
          투어진행기간 : {tourData.startDate} ~ {tourData.endDate}
        </p>
        <p>
          {" "}
          투어 인원 : {tourData.minMember}명 ~ {tourData.maxMember}명
        </p>
      </div>

      <div dangerouslySetInnerHTML={{ __html: tourData.content }} />
      <div>
        {tourData.tourImgs.map((url) => (
          <img src={url} alt="" />
        ))}
      </div>
      <hr />
      {tourData.courses.map((course) => (
        <TourDetailCourse
          lon={course.lon}
          lat={course.lat}
          title={course.title}
          content={course.content}
          image={course.image}
        />
      ))}
      <hr />
      <div>
        <p>현재 모집 현황</p>
        {joiners.length > 0 ? (
          <div>
            <h3>
              <strong>이 투어에 참여하는 사람들</strong>
            </h3>
            <p>
              총 <strong>{tourData.maxMember}</strong>명 중{" "}
              <strong>{joiners.length}</strong>명이 모였어요.
            </p>

            <div>
              <ul>
                {joiners.map((joiner, index) => (
                  <li key={index}>
                    <div>
                      <img
                        src={joiner.profileImage}
                        alt="프로필 이미지"
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "50%",
                        }}
                      />
                      <div>
                        <strong>{joiner.nickname}</strong> 님
                      </div>
                      <div>{joiner.joinDate}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>참가자가 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default TourDetailContent;
