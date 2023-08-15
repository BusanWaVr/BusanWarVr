import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Button, Input } from 'antd';
import { comment } from "postcss";
import CommentCard from "./CommentCard";

const { TextArea } = Input;

const CardContainer = styled.div`
  //   margin: 20px;
`;

const Card = styled.div`
  margin: 20px;
  width: 200px;
  height: 30px;
`;

function TourCommentCard() {
  const path = useLocation().pathname
  const tourId = path.substring(6, path.length);
  const accessToken = localStorage.getItem("accessToken");

  const [content, setContent] = useState("");
  const [comments , setComments] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(()=>{
    console.log(tourId);
    loadCommentData(0);
  }, [])

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const loadCommentData = async (page) => {
    try {
      const response = await fetch(
        `https://busanwavrserver.store/comment/tour/${tourId}?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        const concateComments = comments.concat(data.data);
        setComments(concateComments);
      } else {
        toast.error(
          "댓글 데이터를 받아올 수 없습니다. 잠시 후 다시 시도해 주세요."
        );
      }
    } catch (error){
      console.log(error);
    }
  }

  const registCommentData = async () => {
    try {
      const body = {
        content : content,
        parentId : null
      }

      const response = await fetch(
        `https://busanwavrserver.store/comment/${tourId}`,
        {
          method: "POST",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      let dataBody = data.data;
      dataBody.reComments = [];

      setComments([...comments, dataBody]);

    } catch (error) {
      console.log(error);
    }
  }

  const pagingComment = () => {
    loadCommentData(page + 1);
    setPage(page + 1);
  }

  const handleOnchange = (e) => {
    setContent(e.target.value);
  }

  return (
    <CardContainer>
      {comments.map((comment, index, key) => (
        <CommentCard comment={comment}/>
      ))}
      
      <TextArea rows={4} onChange={handleOnchange}/>
      <Button type="primary" onClick={registCommentData}>댓글 작성</Button>
      <Button type="primary" onClick={pagingComment}>펼쳐보기</Button>
    </CardContainer>
  );
}

export default TourCommentCard;
