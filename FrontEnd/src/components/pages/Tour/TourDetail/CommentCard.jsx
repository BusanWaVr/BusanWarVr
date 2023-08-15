import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Input } from 'antd';
import { useLocation } from 'react-router-dom';
import RecommentCard from "./RecommentCard";

const { TextArea } = Input;

const Comment = styled.div`
    border: 1px solid black;
`;

function CommentCard(props){
    const path = useLocation().pathname
    const tourId = path.substring(6, path.length);
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    const [comment, setComment] = useState(props.comment);
    const [deleted, setDeleted] = useState(props.comment.deleted);
    const [reComments, setReComments] = useState(props.comment.reComments);
    const [content, setContent] = useState("");
    const [editContent, setEditContent] = useState("");
    const [isRegistOpen, setIsRegistOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    
    useEffect(() => {
        console.log(comment);
    }, [comment]);

    const handleOnchange = (e) => {
        setContent(e.target.value);
    }

    const handleEditOnChange = (e) => {
        setEditContent(e.target.value);
    }

    const replyOpenClick = () => {
        setIsRegistOpen(!isRegistOpen);
    }

    const openEditComment = () => {
        setIsEditOpen(!isEditOpen);
        setEditContent(comment.content);
    }

    const registReCommentData = async () => {
        try {
          const body = {
            content : content,
            parentId : comment.commentId
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
          setReComments([...reComments, data.data]);
          setIsRegistOpen(false);

        } catch (error) {
          console.log(error);
        }
      }

      const editComment = async () => {
        try {
          const body = {
            content : editContent,
            parentId : null
          }
    
          const response = await fetch(
            `https://busanwavrserver.store/comment/${comment.commentId}`,
            {
              method: "PUT",
              headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );
    
          const data = await response.json();
          let changeData = data.data;

          changeData.reComments = reComments;
          setComment(changeData);


        } catch (error) {
          console.log(error);
        }
      }

      const deleteComment = async () => {
        try {
            const response = await fetch(
              `https://busanwavrserver.store/comment/${comment.commentId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: accessToken,
                  "Content-Type": "application/json",
                }
              }
            );
      
            const data = await response.json();
            setDeleted(true);
  
          } catch (error) {
            console.log(error);
          }
      }
    

    return (
        <Comment>
            {
            deleted ? 
                <div>삭제된 댓글입니다.</div>
                    : 
                <div>
                    댓글 루트 - {comment.nickname} {comment.content}
                </div>
            }
             
             <Button onClick={replyOpenClick}>대댓글 달기</Button>
             {comment.userId == userId && !deleted? <Button onClick={deleteComment}>댓글 삭제</Button> : <></>}
             {comment.userId == userId && !deleted? <Button onClick={openEditComment}>댓글 수정</Button> : <></>}

             {isEditOpen ? 
                <div>
                    <TextArea rows={4} onChange={handleEditOnChange} value={editContent}/>
                    <Button type="primary" onClick={editComment}>댓글 수정</Button>
                </div>
                : 
                <></>}
             {reComments.map((reComment, index, key) => (
                <RecommentCard reComment={reComment}/>
             ))}
             {isRegistOpen ? 
                <div>
                    <TextArea rows={4} onChange={handleOnchange} />
                    <Button type="primary" onClick={registReCommentData}>대댓글 작성</Button>
                </div>
                : 
                <></>}
        </Comment>
    );
}

export default CommentCard;