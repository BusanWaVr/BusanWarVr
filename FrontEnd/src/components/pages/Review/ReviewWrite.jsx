import React, { useState, useEffect } from "react";
// import Responsive from "../../common/Responsive";
import Editor from "../../blocks/Editor";
import styled from "styled-components";

const StyledWritePage = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const ReviewWrite = () => {
  const [tourId, setTourId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  const handleTourIdChange = (event) => {
    setTourId(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 별점: 추후 수정

  const handleClickScore = (value) => {
    setScore(value);
  };

  useEffect(() => {
    console.log(score);
  }, [score]);

  // 제출

  const handleSubmit = async (e) => {
    console.log("슈웃");
    e.preventDefault();

    if (tourId && title && content && score) {
      try {
        const requestBody = {
          tourId: tourId * 1,
          title: title,
          content: content,
          //   date: new Date().toISOString(),
          score: score,
        };

        const response = await fetch("http://52.79.93.203/tour/review", {
          method: "POST",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        console.log(requestBody);

        const data = await response.json();

        if (data.code === "200") {
          alert(data.message);
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
        <h1>투어 후기 글쓰기 페이지</h1>
        <br />
        <form>
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
      <p>별점 : {score}</p>
      <div>
        {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
          <button key={value} onClick={() => handleClickScore(value)}>
            {value}
          </button>
        ))}
      </div>
      <button type="submit" onClick={handleSubmit}>
        등록
      </button>
    </StyledWritePage>
    // </Responsive>
  );
};

export default ReviewWrite;
