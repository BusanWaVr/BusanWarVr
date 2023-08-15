import React, { useState, useEffect } from "react";
// import Responsive from "../../common/Responsive";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Input, Button, Avatar } from "antd";
import Editor from "../../blocks/Editor";
import { toast } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";

const MateWrite = () => {
  const { tourId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tourData, setTourData] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(
          `https://busanwavrserver.store/tour/${tourId}`
        );
        if (response.status === 200) {
          const res = await response.json();
          setTourData(res.data);
        } else {
          toast.error("해당 투어가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTourData();
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

    if (tourId && title && content) {
      try {
        const requestBody = {
          tourId: tourId,
          title: title,
          content: content,
        };

        const response = await fetch("https://busanwavrserver.store/mate", {
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
          toast.success(data.message);
          window.location.href = `/matedetail/${newMateId}`;
        } else {
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
        메이트 모집 등록
      </Button>
    </div>
  ) : (
    <div>로딩 중 ...</div>
  );
};

export default MateWrite;
