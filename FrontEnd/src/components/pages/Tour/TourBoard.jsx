import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TourListCard from "../../blocks/TourListCard";
import SearchBar from "../../blocks/SearchBar";
import { useI18n } from "../../../hooks/useI18n"

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${(props) => (props.active ? "#007bff" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#007bff")};
  cursor: pointer;
`;

const PrevButton = styled(Button)`
  background-color: #fff;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

function TourBoard() {
  const t = useI18n()
  const [currentPage, setCurrentPage] = useState(0);
  const [tempPage, setTempPage] = useState(0);
  const [type, setType] = useState("TITLE");

  // 검색결과값
  const [searchResults, setSearchResults] = useState([]);

  // 검색어 (Searchbar에서 받아옴)
  const [searchValue, setSearchValue] = useState("");

  const location = useLocation();

  const handleSearchValue = (searchValue, type) => {
    console.log("검색창에서 받은 검색어:", searchValue, type);
    setSearchValue(searchValue); // 검색어 상태값 업데이트
    setType(type);
  };

  // 메인화면에서 넘어옴
  useEffect(() => {
    if (location.state) {
      const { type: type, keyword: keyword } = location.state;
      setType(type);
      setSearchValue(keyword);
      console.log(type, keyword);
    }
  }, [location.state]);

  // 초기값 통신
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          type: type,
          keyword: searchValue,
        };
        const response = await fetch(
          `https://busanwavrserver.store/tour/search?page=${tempPage}`,
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
          // console.log("부모에서 넘겨주고 있음", data.data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tempPage, searchValue, type]);

  const handlePrevClick = () => {
    setCurrentPage((currentPage) => currentPage - 3);
  };

  const handleNextClick = () => {
    setCurrentPage((currentPage) => currentPage + 3);
  };

  return (
    <div>
      <h1>{t(`투어 목록 페이지`)}</h1>
      <SearchBar onSearch={handleSearchValue} />
      <TourListCard TourData={searchResults} tempPage={tempPage} />

      <ButtonContainer>
        <PrevButton onClick={handlePrevClick} disabled={currentPage === 0}>
        {t(`이전`)}
        </PrevButton>

        <Button onClick={() => setTempPage(currentPage + 1)}>
          {currentPage + 1}
        </Button>
        <Button onClick={() => setTempPage(currentPage + 2)}>
          {currentPage + 2}
        </Button>
        <Button onClick={() => setTempPage(currentPage + 3)}>
          {currentPage + 3}
        </Button>
        <Button onClick={handleNextClick}>{t(`다음`)}</Button>
      </ButtonContainer>
    </div>
  );
}

export default TourBoard;
