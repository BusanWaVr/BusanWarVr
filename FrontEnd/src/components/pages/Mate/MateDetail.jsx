import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Avatar, Button } from "antd";
import styled from "styled-components";
import CurrentMate from "../../blocks/CurrentMate";
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const MateDetail = () => {
  const { mateId } = useParams();
  const [mateData, setMateData] = useState(null);
  const [joinerData, setJoinerData] = useState(null);
  const [tourId, setTourId] = useState("");
  const [tourData, setTourData] = useState(null);
  const navigate = useNavigate();

  // 상세페이지 데이터 받아오기
  useEffect(() => {
    const fetchMateData = async () => {
      try {
        const response = await fetch(
          `https://busanwavrserver.store/mate/${mateId}`
        );
        // console.log(response)
        if (response.status === 200) {
          const data = await response.json();

          // mate정보만 저장하기
          setMateData(data.data.mate);
          setTourId(data.data.mate.tourId);

          // joiner정보
          setJoinerData(data.data.joiners);
        } else {
          console.log(response.message);
          alert("해당 메이트 게시글이 존재하지 않습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMateData();
  }, [mateId]);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(
          `https://busanwavrserver.store/tour/${mateData.tourId}`
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

  const accessToken = localStorage.getItem("accessToken");
  const userId = parseInt(localStorage.getItem("userId"), 10);

  const url = `https://busanwavrserver.store/mate/${mateId}`;

  const handleDelete = async () => {
    try {
      console.log(typeof userId);
      console.log(typeof mateData.writerId);

      if (userId === mateData.writerId) {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          alert("삭제되었습니다.");
          navigate("/mate");
        } else {
          alert(response.message);
        }
      } else {
        alert("글 작성자 본인만 삭제할 수 있습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 수정페이지로
  const handleButtonClick = ({ mateData }) => {
    if (userId === mateData.writerId) {
      navigate(`/mateedit/${mateId}`, {
        state: {
          tourId: mateData.tourId,
          title: mateData.title,
          content: mateData.content,
        },
      });
    } else {
      alert("글 작성자 본인만 수정할 수 있습니다.");
    }
  };

  const handleList = () => {
    navigate("/mate");
  };

  console.log(mateData);

  return tourData && mateData ? (
    <div>
      <br />
      <div className="mx-4 sm:mx-24 lg:mx-48 mb-6 rounded-md">
        <p className="text-left mb-3 font-semibold">투어 메이트 모집</p>
        <div
          className="text-left p-6"
          style={{
            borderTop: "2px solid #1983ff",
            borderBottom: "1px solid #cccccc",
          }}
        >
          <div className="flex gap-5 items-center">
            <img
              src={
                tourData.tourImgs[0]
                  ? tourData.tourImgs[0]
                  : "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"
              }
              alt={tourData.title}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "5px",
                objectFit: "cover",
              }}
            />
            <div className="flex flex-col gap-1">
              <Link to={`/tour/${mateData.tourId}`} className="text-xl">
                {mateData.tourTitle}
              </Link>
              <Link
                to={`/guide/${tourData.userId}/mypage`}
                className="flex items-center  gap-1 text-sm"
              >
                <Avatar src={tourData.profileImg} alt="" />
                <p>{tourData.nickname}</p>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="text-left py-4 flex justify-between items-center px-4"
          style={{ borderBottom: "1px solid #cccccc" }}
        >
          <div className="font-bold">{mateData.title} </div>
          <p>
            작성자{" "}
            <Link to={`../user/${mateData.writerId}/mypage`}>
              {mateData.writerNickname}
            </Link>
          </p>
        </div>
        <div
          className="text-left py-6 px-4 bg-sky-50"
          style={{ minHeight: "250px" }}
        >
          <div dangerouslySetInnerHTML={{ __html: mateData.content }} />
        </div>

        <div
          className="text-left p-4"
          style={{
            borderBottom: "2px solid #1983ff",
          }}
        >
          <p className="text-2xl font-bold text-blue-500 my-6">
            현재 모집 현황
          </p>
          <CurrentMate tourData={tourData} joiners={tourData.joiners} />
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button
            type="link"
            onClick={handleList}
            icon={<UnorderedListOutlined />}
            style={{ display: "flex", alignItems: "center", color: "#2a2a2a" }}
          >
            목록
          </Button>
          {userId === mateData.writerId ? (
            <>
              <Button
                type="link"
                onClick={() => handleButtonClick({ mateData })}
                icon={<EditOutlined />}
                style={{ display: "flex", alignItems: "center" }}
              >
                수정
              </Button>
              <Button
                danger
                type="link"
                onClick={handleDelete}
                icon={<DeleteOutlined />}
                style={{ display: "flex", alignItems: "center" }}
              >
                삭제
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <div>로딩 중 ...</div>
  );
};

export default MateDetail;
