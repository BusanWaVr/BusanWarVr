import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MateCard from "../../blocks/MateCard";
import { Pagination } from "antd";

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
        const data = await response.json();
        console.log(parseInt(data.data.mateList.length / 6));
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

  const onChange = (e) => {
    setTempPage(e);
  };

  return (
    <>
      <div className="flex flex-col justify-around items-between">
        <MateCard
          mateData={mateListData.slice(tempPage * 6, (tempPage + 1) * 6)}
        />
      </div>
      <div className="w-full fixed bottom-0 py-3 backdrop-blur-md">
        <Pagination
          onChange={onChange}
          defaultCurrent={1}
          total={mateListData.length}
        />
      </div>
    </>
  );
};

export default MateList;
