import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const TourDetail = () => {
  const { tourId } = useParams();
  const [tourData, setTourData] = useState(null);

  function dateFormat(date) {
    let dateFormat2 =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
    return dateFormat2;
  }

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
            모집기간 : {tourData.startDate} ~ {tourData.endDate}
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
        </div>
      ) : (
        <p>로딩중</p>
      )}
    </>
  );
};

export default TourDetail;
