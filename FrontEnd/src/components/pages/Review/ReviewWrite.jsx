import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Input, Button, Avatar } from "antd";
import Editor from "../../blocks/Editor";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#1983FF",
  },
  "& .MuiRating-iconHover": {
    color: "#006AE6",
  },
});

const ReviewWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState(0);
  const [tourData, setTourData] = useState(null);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const { tourId } = useParams();

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

  const userId = localStorage.getItem("userId");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClickScore = (value) => {
    setScore(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (score == "0") {
      toast.warning("평점을 등록해주세요!");
      return;
    }
    if (!title) {
      toast.warning("제목을 입력해주세요!");
      return;
    }
    if (!content) {
      toast.warning("내용을 입력해주세요!");
      return;
    }

    if (tourId && title && content && score) {
      try {
        const requestBody = {
          tourId: tourId * 1,
          title: title,
          content: content,
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

        const data = await response.json();

        if (data.code === "200") {
          toast.success("리뷰를 성공적으로 등록하였습니다.");
          // 리뷰 쓰기 완료하면 마이페이지의 리뷰보드로 이동하게 해뒀는데 더 좋은 아이디어 있으면 공유
          navigate(`/user/${userId}/mypage/review`);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return tourData ? (
    <div className="mx-4 sm:mx-24 lg:mx-48 2xl:mx-96 my-6">
      <div>
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

          <div className="flex flex-col items-center justify-center gap-1 mb-6">
            <p className="font-semibold">위 투어는 어떠셨나요?</p>
            <p className="text-sm text-slate-400">
              투어 및 가이드에 대한 만족도를 평점으로 남겨주세요.
            </p>
            <StyledRating
              name="score"
              value={score}
              size="large"
              onChange={(event, newValue) => {
                handleClickScore(newValue);
              }}
              precision={0.5}
            />
          </div>

          <Input
            type="text"
            placeholder="리뷰의 제목을 입력해주세요."
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
        리뷰 등록
      </Button>
    </div>
  ) : (
    <>로딩중..</>
  );
};

export default ReviewWrite;
