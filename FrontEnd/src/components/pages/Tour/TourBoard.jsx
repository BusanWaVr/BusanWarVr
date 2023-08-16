import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TourListCard from "../../blocks/TourListCard";
import SearchBar from "../../blocks/SearchBar";
import { useI18n } from "../../../hooks/useI18n";
import { Pagination } from "antd";

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
  const t = useI18n();
  const [currentPage, setCurrentPage] = useState(1);
  const [tempPage, setTempPage] = useState(1);
  const [type, setType] = useState("TITLE");
  const [temp, setTemp] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  // 검색결과값
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultFirst, setSearchResultFirst] = useState([]);
  const [searchResultSecond, setSearchResultSecond] = useState([]);
  const [searchResultThird, setSearchResultThird] = useState([]);

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
    console.log(tempPage);
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
          
          console.log("부모에서 넘겨주고 있음", data.data);
          const size = data.data.length;
          setTotalSize(size);
          if(size > 0 && size < 7){
            setSearchResults(data.data.slice(0, size));
            setSearchResultFirst(data.data.slice(0, size));
            setSearchResultSecond([]);
            setSearchResultThird([]);
          }
          else if(size > 6 && size < 13){
            setSearchResults(data.data.slice(0, 6));
            setSearchResultFirst(data.data.slice(0, 6));
            setSearchResultSecond(data.data.slice(7, size));
            setSearchResultThird([]);
          }
          else if(size > 12 && size < 19){
            setSearchResults(data.data.slice(0, 6));
            setSearchResultFirst(data.data.slice(0, 6));
            setSearchResultSecond(data.data.slice(6, 12));
            setSearchResultThird(data.data.slice(12, size));
          }
          
          if(temp < tempPage && size == 0){
            setCurrentPage((currentPage) => currentPage - 3);
            setTempPage((tempPage) => tempPage - 1);
          }

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
    setTemp(tempPage);
    setCurrentPage((currentPage) => currentPage - 3);
    setTempPage((tempPage) => tempPage - 1);
  };

  const handleNextClick = () => {
    setTemp(tempPage);
    setCurrentPage((currentPage) => currentPage + 3);
    setTempPage((tempPage) => tempPage + 1);
  };

  const onChange = (e) => {
    setCurrentPage(e);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearchValue} />
      <TourListCard TourData={searchResults} tempPage={tempPage} />

      <ButtonContainer>
        <PrevButton onClick={handlePrevClick} disabled={currentPage === 0}>
          {t(`이전`)}
        </PrevButton>


        
        <Button onClick={() => {
          setSearchResults(searchResultFirst);
        }}>
          {currentPage + 1}
        </Button>
        {searchResultSecond.length == 0 ? <></> : <Button onClick={() => {
          setSearchResults(searchResultSecond);
        }}>
          {currentPage + 2}
        </Button>
        }
        
        {searchResultThird.length == 0 ? <></> : <Button onClick={() => {
          setSearchResults(searchResultThird);
        }}>
          {currentPage + 3}
        </Button>}
        
        <Button onClick={handleNextClick}>{t(`다음`)}</Button>
      </ButtonContainer>
      <div className="w-full fixed bottom-0 py-3 backdrop-blur-md border-top">
        <Pagination
          onChange={onChange}
          defaultCurrent={1}
          total={searchResults.length}
        />
      </div>
    </div>
  );
}

export default TourBoard;
