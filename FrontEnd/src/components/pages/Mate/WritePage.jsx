import React, { useState } from "react";
// import Responsive from "../../common/Responsive";
import Editor from "./Editor";
import styled from "styled-components";

const StyledWritePage = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const WritePage = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  // const [desc, setDesc] = useState("");
  // function onEditorChange(value) {
  //   setDesc(value);
  // }

  const createFormData = async (url, title, content) => {
    const formData = new FormData();
    formData.append("url", url);
    formData.append("title", title);
    formData.append("content", content);
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("슈웃");

    if (title && content && url) {
      const formData = await createFormData(url, title, content);

      let values = formData.values();
      for (const pair of values) {
        console.log(pair);
      }

      const apiUrl = "http://52.79.93.203/mate";

      try {
        const response = await axios.post(apiUrl, formData);
        if (response.data && response.data.code === "200") {
          alert(response.data.message);
          console.log(response.data);

          // 메이트 목록 페이지로 이동?
          // 아니면 직전 화면으로?
          window.location.href = "/";
        }
      } catch (error) {
        // console.log(error.response.data);
        if (
          error.response &&
          error.response.data &&
          error.response.data.status === "409"
        ) {
          alert(error.response.data.message);
        } else {
          alert("죄송합니다. 잠시 후 다시 시도해 주세요.");
        }
      }
    } else {
      // 필수 필드들이 모두 입력되지 않았을 경우
      alert("모든 필수 정보를 입력해주세요.");
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
          <label htmlFor="url">투어 url :　</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={handleUrlChange}
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
          <Editor value={content} onChange={handleContentChange} />
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

export default WritePage;
