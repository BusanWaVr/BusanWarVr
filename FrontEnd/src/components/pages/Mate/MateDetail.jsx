import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
          <div>
            {/* <p>여기 같이가요!</p> */}
            {/* 투어 아이디 받아와서 링크랑 제목달아주기! 참가인원도! */}
            
          </div>

          <h3><strong>제목: {mateData.title}</strong></h3>
          <br />
          <span>내용: </span>
          <div dangerouslySetInnerHTML={{ __html: mateData.content }} />

          <br />
          <br />
          <br />
          {joinerData.length > 0 ? (
            <div>
              <h2>참가자 목록</h2>
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
                        <div>{joiner.nickname}</div>
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