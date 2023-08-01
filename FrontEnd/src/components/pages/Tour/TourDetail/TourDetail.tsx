import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TourDetailCourse from "./TourDetailCourse";

interface TourData {
  tourId: string;
  title: string;
  subTitle: string;
  userId: string;
  profileImg: string;
  nickname: string;
  category: string[];
  startDate: string;
  endDate: string;
  minMember: number;
  maxMember: number;
  content: string;
  tourImgs: string[];
  joiners: Joiner[];
  canceled: boolean;
  ended: boolean;
  courses: Course[];
}

interface Course {
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: string;
}

interface Joiner {
  profileImg: string;
  nickname: string;
  joinDate: string;
}

const TourDetail: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const [tourData, setTourData] = useState<TourData | null>(null);
  const currentUser = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(`http://52.79.93.203/tour/${tourId}`);
        if (response.status === 200) {
          const res = await response.json();
          console.log(res);
          setTourData(res.data);
        } else {
          alert("해당 투어가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTourData();
  }, [tourId]);

  return (
    <>
      <h1>{tourId}</h1>

      {tourData ? (
        <div>
          <p>제목 : {tourData.title}</p>
          <p>부제 : {tourData.subTitle}</p>
          <p>
            가이드 :
            <Link to={`/guide/${tourData.userId}/detail`}>
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
          <div dangerouslySetInnerHTML={{ __html: tourData.content }} />
          <div>
            {tourData.tourImgs.map((url) => (
              <img src={url} alt="" />
            ))}
          </div>
          <hr />
          {/* TODO - 코스 목록 띄우기 (지도 API를 포함한 코스 컴포넌트 만들기) */}
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
            {tourData.joiners.length > 0 ? (
              <div>
                <h3>
                  <strong>이 투어에 참여하는 사람들</strong>
                </h3>
                <p>
                  총 <strong>{tourData.maxMember}</strong>명 중{" "}
                  <strong>{tourData.joiners.length}</strong>명이 모였어요.
                </p>

                <div>
                  <ul>
                    {tourData.joiners.map((joiner, index) => (
                      <li key={index}>
                        <div>
                          <img
                            src={joiner.profileImg}
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
          <hr />
          {/* TODO - 각 버튼이 동작하도록 기능 구현 */}
          {currentUser == tourData.userId ? (
            <>
              <button>수정하기</button>
              <button>투어 진행 취소하기..:(</button>
            </>
          ) : (
            <>
              {!tourData.canceled && !tourData.ended ? (
                <button>투어 예약하기</button>
              ) : null}
              {tourData.ended ||
              (new Date(tourData.startDate) < new Date() &&
                !tourData.canceled) ? (
                <button disabled>종료된 투어입니다.</button>
              ) : null}
              {tourData.canceled ? (
                <button disabled>취소된 투어입니다.</button>
              ) : null}
            </>
          )}
        </div>
      ) : (
        <p>로딩중</p>
      )}
    </>
  );
};

export default TourDetail;
