import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Input, Button, Avatar } from "antd";
import Editor from "../../blocks/Editor";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";

const MateEdit = () => {
  const { mateId } = useParams();
  const [tourId, setTourId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tourData, setTourData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
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

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(
          `https://busanwavrserver.store/tour/${tourId}`
        );
        if (response.status === 200) {
          const res = await response.json();
          console.log(res.data);
          setTourData(res.data);
        } else {
          toast.error("해당 투어가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (tourId != "") {
      fetchTourData();
    }
  }, [tourId]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.warning("제목을 입력해주세요!");
      return;
    }
    if (!content) {
      toast.warning("내용을 입력해주세요!");
      return;
    }

    if (title && content) {
      try {
        const requestBody = {
          title: title,
          content: content,
        };

        const response = await fetch(
          `https://busanwavrserver.store/mate/${mateId}`,
          {
            method: "PUT",
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();

        if (data.code === "200") {
          toast.success("게시글 수정이 완료되었습니다.");
          navigate(`/matedetail/${mateId}`);
        } else {
          // 에러
          console.log(data.message);
          toast.error("죄송합니다. 잠시후 다시 시도해 주세요.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return tourData ? (
    <div className="mx-4 sm:mx-24 lg:mx-48 2xl:mx-96 my-6">
      <div>
        <br />
        <form>
          <div className="w-1/3 mx-auto mt-6 flex flex-col items-center gap-2">
            <img
              src={tourData.tourImgs[0]}
              alt=""
              className="w-40 h-40 rounded-full object-cover"
            />
            <p className="font-bold text-lg">{tourData.title}</p>
            <div className="flex items-center justify-center gap-1 text-sm">
              <Avatar src={tourData.profileImg} alt="" />
              <p>{tourData.nickname}</p>
            </div>
          </div>
          <br />
          <br />
          <Input
            type="text"
            placeholder="게시글의 제목을 입력해주세요."
            value={title}
            onChange={handleTitleChange}
            style={{ height: "45px" }}
          />
          <br />
          <br />
          <Editor value={content} onChange={setContent} customHeight="300px" />
        </form>
      </div>
      <br />
      <Button
        type="primary"
        onClick={handleSubmit}
        icon={<EditOutlined />}
        style={{
          width: "100%",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        메이트 모집 수정
      </Button>
    </div>
  ) : (
    <div>로딩 중 ...</div>
  );
};

export default MateEdit;
