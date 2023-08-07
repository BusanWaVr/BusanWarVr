import React, { useState, useEffect } from "react";
// import Responsive from "../../common/Responsive";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../../blocks/Editor";
import styled from "styled-components";

const StyledWritePage = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const ReviewWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState("");

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const { tourId } = useParams();

  // 로컬이 아니라, 종료 보드에서 userId를 가져와야 하는데..
  const userId = localStorage.getItem("userId");

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

        const response = await fetch(
          "https://busanwavrserver.store/tour/review",
          {
            method: "POST",
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        console.log(requestBody);

        const data = await response.json();

        if (data.code === "200") {
          alert(data.message);
          // 리뷰 쓰기 완료하면 마이페이지의 리뷰보드로 이동하게 해뒀는데 더 좋은 아이디어 있으면 공유
          navigate(`/user/${userId}/mypage/review`);
        } else {
          // 에러
          console.log(data.message);
          alert(data.message);
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
          <input type="text" id="tourId" value={tourId} disabled />
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
