import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MateCard from "../../blocks/MateCard";
import { Pagination } from "antd";

const MateList = () => {
  const [mateListData, setMateListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [totalInfo, setTotalInfo] = useState(12);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    console.log(currentPage);
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://busanwavrserver.store/mate?page=${currentPage - 1}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setTotalInfo(data.data.totalCount);
        setMateListData(data.data.mateList);
      } else {
        alert("메이트 목록을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCurrentPage(e);
  };

  return (
    <>
      {mateListData && (
        <div className="flex flex-col justify-around items-between">
          <MateCard mateData={mateListData} />
        </div>
      )}
      <div className="w-full py-3">
        <Pagination onChange={onChange} defaultCurrent={1} total={totalInfo} />
      </div>
    </>
  );
};

export default MateList;
