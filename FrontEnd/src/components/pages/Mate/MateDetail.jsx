import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          setJoinerData(data.data.joiner);

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
          <h3><strong>{mateData.title}</strong></h3>
          <br />
          <div dangerouslySetInnerHTML={{ __html: mateData.content }} />
        </div>
      ) : (
        <p>로딩중ㅎ</p>
      )}
    </div>
  );
};

export default MateDetail;