import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MateList = () => {
  const [mateListData, setMateListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMateListData = async () => {
      try {
        const response = await fetch(`http://52.79.93.203/mate?page=${currentPage}`);
        if (response.status === 200) {
          const data = await response.json();
          setMateListData(data.data.mateList);
          

          // 페이지 수
          setTotalPages(Math.floor(data.data.totalCount / 6) + 1);
        } else {
          alert("메이트 목록을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMateListData();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <h1>메이트 목록 페이지</h1>
      {mateListData.map((mate, index) => (
        <div key={mate.mateId}>
          <h3>
            <Link to={`/matedetail/${mate.mateId}`} style={{ fontWeight: "bold" }}>
              {mate.title}
            </Link>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: mate.content }} />
          <p>
            참가인원: {mate.joinMember}/{mate.maxMember}
          </p>
          {index % 3 === 2 && <br />}
        </div>
        
      ))}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          이전 페이지
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default MateList;