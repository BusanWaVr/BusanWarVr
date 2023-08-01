import React, { useState, useEffect } from "react";
// import Responsive from "../../common/Responsive";
import Editor from "../../blocks/Editor";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const StyledWritePage = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const MateEdit = () => {
  const { mateId } = useParams();
  const [tourId, setTourId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // location.state에서 초기값을 가져와서 설정합니다.
    if (location.state) {
      const {
        tourId: initialTourId,
        title: initialTitle,
        content: initialContent,
      } = location.state;
      setTourId(initialTourId);
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [location.state]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("슈웃");
    e.preventDefault();

    if (title && content) {
      try {
        const requestBody = {
          title: title,
          content: content,
        };

        const response = await fetch(`http://52.79.93.203/mate/${mateId}`, {
          method: "PUT",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (data.code === "200") {
          alert("게시글 수정이 완료되었습니다.");
          navigate(`/matedetail/${mateId}`);
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
        <h1>메이트 모집 수정 페이지</h1>
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
      <button type="submit" onClick={handleSubmit}>
        등록
      </button>
    </StyledWritePage>
    // </Responsive>
  );
};

export default MateEdit;
