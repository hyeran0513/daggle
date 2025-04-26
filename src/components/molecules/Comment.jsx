import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { formatToYYMMDD } from "../../utils/format";
import { useParams } from "react-router-dom";
import { useDeleteComment, useEditComment } from "../../hooks/useCommentData";
import authStore from "../../stores/authStore";
import { useCommentForm } from "../../hooks/useCommentForm";
import TextField from "../atoms/TextField";
import useInputChange from "../../hooks/useInputChange";

const Comment = ({ comment }) => {
  const [state, dispatch] = useCommentForm();
  const handleInputChange = useInputChange(dispatch);
  const { id: postId } = useParams();
  const { mutate: deleteMutate } = useDeleteComment(postId, comment?.id);
  const { mutate: editMutate } = useEditComment(postId, comment?.id);
  const [isEdit, setIsEdit] = useState(false);
  const { user } = authStore();

  // 댓글 삭제 핸들러
  const handleDelete = useCallback(() => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      deleteMutate();
    }
  }, [deleteMutate]);

  // 수정 토글 핸들러
  const handleEditToggle = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  // 댓글 수정 취소 핸들러
  const handleCancel = useCallback(() => {
    setIsEdit(false);
    dispatch({ type: "SET_COMMENT", payload: comment?.content });
  }, [dispatch, comment?.content]);

  // 수정 확인 핸들러
  const handleConfirm = useCallback(() => {
    if (confirm("댓글을 수정하시겠습니까?")) {
      editMutate({ content: state.comment });
      setIsEdit(false);
    }
  }, [editMutate, state.comment]);

  useEffect(() => {
    if (comment) {
      dispatch({ type: "SET_COMMENT", payload: comment?.content });
    }
  }, [comment]);

  return (
    <CommentItem>
      <Meta>
        <UserInfo>
          <ProfileImageWrapper>
            {user?.profileImageUrl && (
              <ProfileImage img={user?.profileImageUrl} alt="" />
            )}
          </ProfileImageWrapper>
          <NickName>{comment?.user?.nickname || "(닉네임 없음)"}</NickName>
        </UserInfo>

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
                  <ControlButton onClick={handleEditToggle}>수정</ControlButton>
                  <ControlButton onClick={handleDelete}>삭제</ControlButton>
                </>
              </>
            )}
          </ButtonWrapper>
        )}
      </Meta>

      {isEdit ? (
        <TextField
          type="text"
          value={state.comment}
          placeholder={state.placeholder.comment}
          onChange={handleInputChange("comment")}
          error={state.errors.comment}
        />
      ) : (
        <>
          <Content>{comment?.content}</Content>
          <Date>{formatToYYMMDD(comment?.createdAt)}</Date>
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

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImageWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray600};
  overflow: hidden;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-color: ${({ theme }) => theme.colors.gray400};
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NickName = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray900};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
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

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

const ControlButton = styled.button`
  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

export default Comment;
