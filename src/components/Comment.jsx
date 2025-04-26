import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "../utils/format";
import { useParams } from "react-router-dom";
import { useDeleteComment, useEditComment } from "../hooks/useCommentData";
import { inputField } from "../styles/mixins";
import authStore from "../stores/authStore";
import { useCommentForm } from "../hooks/useCommentForm";

const Comment = ({ comment }) => {
  const [state, dispatch] = useCommentForm();
  const { id: postId } = useParams();
  const { mutate: deleteMutate } = useDeleteComment(postId, comment?.id);
  const { mutate: editMutate } = useEditComment(postId, comment?.id);
  const [isEdit, setIsEdit] = useState(false);
  const { user } = authStore();

  const deleteComment = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutate();
    }
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleCancel = () => {
    setIsEdit(false);
    dispatch({ type: "SET_COMMENT", payload: comment?.content });
  };

  const handleConfirm = () => {
    if (confirm("댓글을 수정하시겠습니까?")) {
      editMutate({ content: state.comment });
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (comment) {
      dispatch({ type: "SET_COMMENT", payload: comment?.content });
    }
  }, [comment]);

  return (
    <CommentItem>
      <Meta>
        <NickName>{comment?.user?.nickname || "(알 수 없음)"}</NickName>

        {/* 본인 작성 댓글일 경우 버튼 노출 */}
        {comment?.user?.id === user?.id && (
          <ButtonWrapper>
            {isEdit ? (
              <>
                <ControlButton onClick={handleCancel}>취소</ControlButton>
                <ControlButton onClick={handleConfirm}>확인</ControlButton>
              </>
            ) : (
              <>
                <>
                  <ControlButton onClick={handleEdit}>수정</ControlButton>
                  <ControlButton onClick={deleteComment}>삭제</ControlButton>
                </>
              </>
            )}
          </ButtonWrapper>
        )}
      </Meta>

      {isEdit ? (
        <InputField
          type="text"
          value={state.comment}
          placeholder="댓글을 입력해 주세요."
          onChange={(e) => {
            dispatch({ type: "SET_COMMENT", payload: e.target.value });
            dispatch({ type: "CLEAR_ERROR", payload: "comment" });
          }}
          error={Boolean(state.errors.comment)}
        />
      ) : (
        <>
          <Content>{comment?.content}</Content>
          <Date>{formatDate(comment?.createdAt)}</Date>
        </>
      )}
    </CommentItem>
  );
};

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NickName = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray900};
`;

const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray800};
`;

const Date = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray600};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

const InputField = styled.input`
  ${inputField};
`;

const ControlButton = styled.button``;

export default Comment;
