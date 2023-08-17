import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TourListCard from "../../blocks/TourListCard";
import SearchBar from "../../blocks/SearchBar";
import { useI18n } from "../../../hooks/useI18n";
import { Pagination } from "antd";
import BoogieSearchBar from "../../../assets/boogie_searchBar.png";

const ButtonContainer = styled.ul`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.li`
  // background-color: ${(props) => (props.active ? "#007bff" : "#fff")};
  // color: ${(props) => (props.active ? "#fff" : "#007bff")};
  cursor: pointer;
`;

const PaginationBtn = styled.a`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  min-width: 32px;
  height: 32px;
`;

function TourBoard() {
  const t = useI18n();
  const [currentPage, setCurrentPage] = useState(0);
  const [tempPage, setTempPage] = useState(0);
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
    setSearchValue(searchValue); // 검색어 상태값 업데이트
    setType(type);
  };

  // 메인화면에서 넘어옴
  useEffect(() => {
    if (location.state) {
      const { type: type, keyword: keyword } = location.state;
      setType(type);
      setSearchValue(keyword);
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
          if (size > 0 && size < 7) {
            setSearchResults(data.data.slice(0, size));
            setSearchResultFirst(data.data.slice(0, size));
            setSearchResultSecond([]);
            setSearchResultThird([]);
          } else if (size > 6 && size < 13) {
            setSearchResults(data.data.slice(0, 6));
            setSearchResultFirst(data.data.slice(0, 6));
            setSearchResultSecond(data.data.slice(7, size));
            setSearchResultThird([]);
          } else if (size > 12 && size < 19) {
            setSearchResults(data.data.slice(0, 6));
            setSearchResultFirst(data.data.slice(0, 6));
            setSearchResultSecond(data.data.slice(6, 12));
            setSearchResultThird(data.data.slice(12, size));
          }

          if (temp < tempPage && size == 0) {
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

  const handlePrevClick = (e) => {
    console.log(tempPage, currentPage);
    if (currentPage > 0) {
      setTemp(tempPage);
      setCurrentPage((currentPage) => currentPage - 3);
      setTempPage((tempPage) => tempPage - 1);
    }
  };

  const handleNextClick = () => {
    console.log(tempPage, currentPage);
    setTemp(tempPage);
    setCurrentPage((currentPage) => currentPage + 3);
    setTempPage((tempPage) => tempPage + 1);
  };

  return (
    <div>
      <div
        className="w-4/5 md:w-3/5 mx-auto my-12 py-12"
        style={{ position: "relative" }}
      >
        <SearchBar onSearch={handleSearchValue} />
        <img
          src={BoogieSearchBar}
          style={{ width: "100px", position: "absolute", top: "-25px" }}
        />
      </div>

      <TourListCard TourData={searchResults} tempPage={tempPage} />

      {/* 페이지네이션 */}
      <ButtonContainer className="ant-pagination">
        {/* 이전 */}
        <li
          title="Previous Page"
          className="ant-pagination-prev ant-pagination-disabled"
          aria-disabled="true"
        >
          <PaginationBtn
            className="ant-pagination-item-link"
            type="button"
            tabindex="-1"
            disabled={currentPage === 0}
            onClick={handlePrevClick}
            style={currentPage === 0 ? { color: "rgba(0, 0, 0, 0.25)" } : {}}
          >
            <span role="img" aria-label="left" className="anticon anticon-left">
              <svg
                viewBox="48 48 896 896"
                focusable="false"
                data-icon="left"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
              </svg>
            </span>
          </PaginationBtn>
        </li>

        {/* 1번쨰 */}
        <Button
          title={currentPage + 1}
          className="ant-pagination-item ant-pagination-item-2"
          tabindex="0"
        >
          <PaginationBtn
            rel="nofollow"
            onClick={() => {
              setSearchResults(searchResultFirst);
            }}
          >
            {currentPage + 1}
          </PaginationBtn>
        </Button>

        {/* 2번째 */}
        {searchResultSecond.length != 0 && (
          <Button
            title={currentPage + 2}
            className="ant-pagination-item ant-pagination-item-2"
            tabindex="0"
          >
            <PaginationBtn
              rel="nofollow"
              onClick={() => {
                setSearchResults(searchResultSecond);
              }}
            >
              {currentPage + 2}
            </PaginationBtn>
          </Button>
        )}

        {/* 3번쨰 */}
        {searchResultThird.length != 0 && (
          <Button
            title={currentPage + 3}
            className={
              "ant-pagination-item ant-pagination-item-2" +
              `${tempPage === currentPage + 2 ? "active" : ""}`
            }
            tabindex="0"
          >
            <PaginationBtn
              rel="nofollow"
              onClick={() => {
                setSearchResults(searchResultThird);
              }}
            >
              {currentPage + 3}
            </PaginationBtn>
          </Button>
        )}

        {/* 다음 */}
        <li
          title="Next Page"
          className="ant-pagination-next"
          aria-disabled="false"
          tabindex="0"
        >
          <PaginationBtn
            className="ant-pagination-item-link active"
            type="button"
            tabindex="-1"
            onClick={handleNextClick}
          >
            <span
              role="img"
              aria-label="right"
              className="anticon anticon-right"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="right"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
              </svg>
            </span>
          </PaginationBtn>
        </li>
      </ButtonContainer>
    </div>
  );
}

export default TourBoard;
