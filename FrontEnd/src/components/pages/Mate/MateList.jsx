import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MateList = () => {
    const [ mateListData, setMateListData ] = useState(null);
  
    useEffect(() => {
      const fetchMateListData = async () => {
        try {
          const response = await fetch("http://52.79.93.203/mate");
          if (response.status === 200) {
            const data = await response.json();
            setMateListData(data.data.mateList);
  
          } else {
            // 아마도...
            alert("메이트 목록을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.")
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMateListData();
    }, []);
  
    return (
      <div>
        <h1>메이트 목록 페이지</h1>
        {mateListData && mateListData.map((mate) => (
        <div key={mate.mateId}>
          <h3><Link to={`/matedetail/${mate.mateId}`} style={{ fontWeight: "bold" }}>{mate.title}</Link></h3>
          <div dangerouslySetInnerHTML={{ __html: mate.content }} />
          <p>참가인원: {mate.joinMember}/{mate.maxMember}</p>

          {/* /tour/{mate.tourId}로 이동할 수 있는 링크 추가할까말까 */}
          {/* <a href={`/tour/${mate.tourId}`}>상세 보기</a> */}
          <br />
          <br />
        </div>
      ))}
      </div>
    );
  };
  
  export default MateList;