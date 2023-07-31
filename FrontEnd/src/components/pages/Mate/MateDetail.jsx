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
          alert("해당 메이트 게시글이 존재하지 않습니다.")
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMateData();
  }, [mateId]);

  return (
    <div>
      <h1>메이트 상세페이지</h1>
      <br />
      {mateData ? (
        <div>

          <h3><strong>제목: {mateData.title}</strong></h3>
          <br />
          <span>내용: </span>
          <div dangerouslySetInnerHTML={{ __html: mateData.content }} />

          <br />
          <br />
          <Link to={`/tour/${mateData.tourId}`}>해당 투어로 이동하기^_^</Link>
          <br />
          {joinerData.length > 0 ? (
            <div>
              <h3><strong>이 투어에 참여하는 사람들이에요</strong></h3>
              <p>총 <strong>{mateData.maxMember}</strong>명 중 <strong>{joinerData.length}</strong>명이 모였어요.</p>

              <CenteredContainer>
                <ul>
                  {joinerData.map((joiner, index) => (
                    <li key={index}>
                      <JoinerContainer>
                        <img src={joiner.profileImg} alt="프로필 이미지"
                        // 임시로 이미지 줄여둠
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "50%"}} />
                        <div><strong>{joiner.nickname}</strong> 님</div>
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
        </div>
      ) : (
        <p>로딩중ㅎ</p>
      )}
    </div>
  );
};

export default MateDetail;