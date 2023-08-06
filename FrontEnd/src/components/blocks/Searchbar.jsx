import React, { useState, useEffect } from "react";
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
  const [type, setType] = useState("TITLE");


  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "searchValue") {
      setSearchValue(value);
    } else if (name === "type") {
      setType(value);
    }
  };
  
  useEffect(() => {
    onSearch(searchValue, type);
  }, [searchValue, type]);


  return (
    <div>
      <select id="type" name="type" value={type} onChange={handleChange}>
        <option value="TITLE">제목</option>
        <option value="GUIDE">가이드</option>
        <option value="COURSE">코스</option>
        <option value="CATEGORY">카테고리</option>
        <option value="REGION">지역</option>
      </select>
        <Input
        type="text"
        name="searchValue"
        value={searchValue}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
}

export default SearchBar;
