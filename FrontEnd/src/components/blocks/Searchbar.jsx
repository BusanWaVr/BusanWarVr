import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;


function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // 상태값 업데이트 하고
    setSearchValue(value);

    // 부모로 전달하기
    onSearch(value);
  };


  return (
    <div>
      {/* <select id="type" value={type} onChange={handleTypeChange}>
        <option value="TITLE">제목</option>
        <option value="GUIDE">가이드</option>
        <option value="COURSE">코스</option>
        <option value="CATEGORY">카테고리</option>
        <option value="REGION">지역</option>
      </select> */}
        <Input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
}

export default SearchBar;
