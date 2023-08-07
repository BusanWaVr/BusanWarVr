import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const MateList = () => {
  const [mateListData, setMateListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [tempPage, setTempPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    console.log(tempPage);
  }, [tempPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://busanwavrserver.store/mate?page=${currentPage}`
      );
      if (response.status === 200) {
        console.log("데이터18개받았어용");
        const data = await response.json();
        setMateListData(data.data.mateList);
      } else {
        alert("메이트 목록을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevClick = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const oneClick = () => {
    setTempPage(0);
  };

  const twoClick = () => {
    setTempPage(1);
  };

  const threeClick = () => {
    setTempPage(2);
  };

  return (
    <div>
      <h1>메이트 목록 페이지</h1>
      {mateListData.slice(tempPage * 6, (tempPage + 1) * 6).map((mate) => (
        <div key={mate.mateId}>
          {/* <h3 onClick={navigate(`/matedetail/${mate.mateId}`)}> */}
          <h3>
            <Link to={`/matedetail/${mate.mateId}`}>{mate.title}</Link>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: mate.content }} />
          <p>
            참가인원: {mate.joinMember}/{mate.maxMember}
          </p>
        </div>
      ))}
      <div>
        <button onClick={handlePrevClick} disabled={currentPage === 0}>
          이전
        </button>

        <button onClick={oneClick}>{currentPage * 3 + 1}</button>
        <button onClick={twoClick}>{currentPage * 3 + 2}</button>
        <button onClick={threeClick}>{currentPage * 3 + 3}</button>
        <button onClick={handleNextClick}>다음</button>
      </div>
    </div>
  );
};

export default MateList;
