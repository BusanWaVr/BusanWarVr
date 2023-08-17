import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../../hooks/useI18n";
import { Cascader, Input, Select, Space } from "antd";
const { Option } = Select;
const { Search } = Input;
import styles from "./Searchbar.module.css";

function SearchBar({ onSearch }) {
  const t = useI18n();

  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState("TITLE");

  const handleChangeType = (e) => {
    setType(e);
  };

  const handleChangeValue = (e) => {
    setSearchValue(e.target.value);
  };

  const selectBefore = (
    <Select
      defaultValue="TITLE"
      name="type"
      value={type}
      onChange={handleChangeType}
    >
      <Option value="TITLE">{t(`ㅤ제목ㅤㅤ`)}</Option>
      <Option value="GUIDE">{t(`ㅤ가이드ㅤ`)}</Option>
      <Option value="COURSE">{t(`ㅤ코스ㅤㅤ`)}</Option>
      <Option value="CATEGORY">{t(`ㅤ카테고리`)}</Option>
      <Option value="REGION">{t(`ㅤ지역ㅤㅤ`)}</Option>
    </Select>
  );

  useEffect(() => {
    onSearch(searchValue, type);
  }, [searchValue, type]);

  return (
    <Search
      size="large"
      addonBefore={selectBefore}
      defaultValue="mysite"
      value={searchValue}
      onChange={handleChangeValue}
      placeholder="검색어를 입력하세요"
      className={styles.searchBar}
      style={{ zIndex: "1", position: "relative", background: "white" }}
    />
  );
}

export default SearchBar;
