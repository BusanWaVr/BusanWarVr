import React, { useState } from "react";
// import Responsive from "../../common/Responsive";
import Editor from "../../blocks/Editor";
import styled from "styled-components";

const StyledWritePage = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const MateWrite = () => {
  const [tourId, setTourId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  const handleTourIdChange = (event) => {
    setTourId(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("슈웃");
    e.preventDefault();

    if (tourId && title && content) {
      try {
        const requestBody = {
          tourId: tourId,
          title: title,
          content: content,
        };

        const response = await fetch("http://52.79.93.203/mate", {
          method: "POST",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (data.code === "200") {
          const newMateId = data.data.mateId;
          alert(data.message);
          window.location.href = `/matedetail/${newMateId}`;
        } else {
          // 에러
          console.log(data.message);
          alert("죄송합니다. 잠시후 다시 시도해 주세요.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    // <Responsive>
    <StyledWritePage>
      <div>
        <h1>메이트 모집 글쓰기 페이지</h1>
        <br />
        <form>
          {/* 임시 */}
          <label htmlFor="tourId">투어 id :　</label>
          <input
            type="text"
            id="tourId"
            value={tourId}
            onChange={handleTourIdChange}
            placeholder="여기는 나중에 수정합니당"
          />
          <br />
          <br />
          <label htmlFor="title">제목 :　</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력해 주세요."
          />
          <br />
          <br />
          <Editor value={content} onChange={setContent} />
        </form>
      </div>
      <br />
      <button type="submit" onClick={handleSubmit}>
        등록
      </button>
    </StyledWritePage>
    // </Responsive>
  );
};

export default MateWrite;
