import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Input } from 'antd';
import { useLocation } from 'react-router-dom';

const { TextArea } = Input;

const Recomment = styled.div`
  margin-left: 20px;
`;

function RecommentCard(props) {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    const [reComment , setReComment] = useState(props.reComment);
    const [editContent, setEditContent] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [deleted, setDeleted] = useState(props.reComment.deleted);

    const handleEditOnChange = (e) => {
        setEditContent(e.target.value);
    }

    const openEditComment = () => {
        setIsEditOpen(!isEditOpen);
        setEditContent(reComment.content);
    }

    const editComment = async () => {
        try {
          const body = {
            content : editContent,
            parentId : reComment.parentId
          }
    
          const response = await fetch(
            `https://busanwavrserver.store/comment/${reComment.commentId}`,
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
          console.log(changeData);
          setReComment(changeData);
          setIsEditOpen(false);
          

        } catch (error) {
          console.log(error);
        }
      }

      const deleteComment = async () => {
        try {
            const response = await fetch(
              `https://busanwavrserver.store/comment/${reComment.commentId}`,
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
        <Recomment>
             {
            deleted ? 
                <div>삭제된 댓글입니다.</div>
                    : 
                <div>
                    대댓글 루트 - {reComment.content} {reComment.nickname}
                </div>
            }
            
            {reComment.userId == userId && !deleted ? <Button onClick={deleteComment}>댓글 삭제</Button> : <></>}
            {reComment.userId == userId && !deleted ? <Button onClick={openEditComment}>댓글 수정</Button> : <></>}
            {isEditOpen ? 
                <div>
                    <TextArea rows={4} onChange={handleEditOnChange} value={editContent}/>
                    <Button type="primary" onClick={editComment}>댓글 수정</Button>
                </div>
                : 
                <></>}
        </Recomment>
    );
}

export default RecommentCard