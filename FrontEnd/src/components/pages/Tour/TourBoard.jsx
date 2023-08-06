import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import TourListCard from "../../blocks/TourListCard";
import SearchBar from "../../blocks/SearchBar";


function TourBoard() {

    const [currentPage, setCurrentPage] = useState(0);
    const [tempPage, setTempPage] = useState(0);
    const [type, setType] = useState("TITLE");

    // 검색결과값
    const [searchResults, setSearchResults] = useState([]);

    // 검색어 (Searchbar에서 받아옴)
    const [searchValue, setSearchValue] = useState("");
    
    const handleSearchValue = (searchValue) => {
        console.log("검색창에서 받은 검색어:", searchValue);
        setSearchValue(searchValue); // 검색어 상태값 업데이트
      };

    // 초기값 통신
    useEffect(() => {
    const fetchData = async () => {
        try {
            const requestBody = {
                type: type,
                keyword: searchValue
              };
          const response = await fetch(
            `http://52.79.93.203/tour/search?page=${currentPage}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            }
          );
          if (response.status === 200) {
            console.log("투어데이터 받았어요");
            const data = await response.json();
            setSearchResults(data.data);
            console.log("부모에서 넘겨주고 있음", data.data);
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [currentPage, searchValue])


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
        <h1>투어 목록 페이지</h1>
        <SearchBar onSearch={handleSearchValue}/>
        <TourListCard TourData={searchResults} tempPage={tempPage}/>

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
}

export default TourBoard;
