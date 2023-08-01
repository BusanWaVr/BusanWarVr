import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const JoinerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MateDetail = () => {
  const { mateId } = useParams();
  const [mateData, setMateData] = useState(null);
  const [joinerData, setJoinerData] = useState(null);

  // 상세페이지 데이터 받아오기
  useEffect(() => {
    const fetchMateData = async () => {
      try {
        const response = await fetch(`http://52.79.93.203/mate/${mateId}`);
        // console.log(response)
        if (response.status === 200) {
          const data = await response.json();

          // mate정보만 저장하기
          setMateData(data.data.mate);

          // joiner정보
          setJoinerData(data.data.joiners);
        } else {
          // 아마도...
          alert("해당 메이트 게시글이 존재하지 않습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMateData();
  }, [mateId]);

  // 삭제

  const accessToken = localStorage.getItem("accessToken");
  const userId = parseInt(localStorage.getItem("userId"), 10);

  const url = `http://52.79.93.203/mate/${mateId}`;

  const handleDelete = async () => {
    try {
      console.log(typeof userId);
      console.log(typeof mateData.writerId);

      if (userId === mateData.writerId) {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          alert("삭제되었습니다.");
          // Handle any other actions after successful deletion, such as redirecting the user.
        } else {
          // Handle the case when the request is not successful
          alert(response.message);
        }
      } else {
        alert("글 작성자 본인만 삭제할 수 있습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>메이트 상세페이지</h1>
      <br />
      {mateData ? (
        <div>
          <p>모집중인 투어</p>
          <Link to={`/tour/${mateData.tourId}`}>{mateData.tourTitle}</Link>
          <br />
          <br />
          <h3>
            <strong>제목: {mateData.title}</strong>
          </h3>
          <p>글쓴이: {mateData.writerNickname}</p>
          <br />
          <span>내용: </span>
          <div dangerouslySetInnerHTML={{ __html: mateData.content }} />

          <br />
          <br />
          <br />
          {joinerData.length > 0 ? (
            <div>
              <h3>
                <strong>이 투어에 참여하는 사람들</strong>
              </h3>
              <p>
                총 <strong>{mateData.maxMember}</strong>명 중{" "}
                <strong>{joinerData.length}</strong>명이 모였어요.
              </p>

              <CenteredContainer>
                <ul>
                  {joinerData.map((joiner, index) => (
                    <li key={index}>
                      <JoinerContainer>
                        <img
                          src={joiner.profileImg}
                          alt="프로필 이미지"
                          // 임시로 이미지 줄여둠
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
                      </JoinerContainer>
                    </li>
                  ))}
                </ul>
              </CenteredContainer>
            </div>
          ) : (
            <p>참가자가 없습니다.</p>
          )}
          <button onClick={handleDelete}>삭제</button>
        </div>
      ) : (
        <p>로딩중ㅎ</p>
      )}
    </div>
  );
};

export default MateDetail;
