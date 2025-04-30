export const validateForm = (state, mode) => {
  const errors = {};

  // Login.jsx
  if (mode === "login") {
    // 아이디
    if (!state.id || state.id.trim() === "") {
      errors.id = "아이디를 입력해주세요.";
    }

    // 비밀번호
    if (!state.password || state.password.trim() === "") {
      errors.password = "비밀번호를 입력해주세요.";
    }
  }

  // PostWrite.jsx
  if (mode === "post") {
    // 제목
    if (!state.title || state.title.trim() === "") {
      errors.title = "최소 1자 이상 입력해주세요.";
    }

    // 내용
    if (!state.content || state.content.trim().length < 10) {
      errors.content = "최소 10자 이상 입력해주세요.";
    } else if (state.content.trim().length > 300) {
      errors.content = "내용은 300자 이하로 입력해 주세요.";
    }
  }

  // CommentForm.jsx
  if (mode === "comment") {
    // 댓글
    if (!state.comment || state.comment.trim() === "") {
      errors.comment = "댓글을 입력해 주세요.";
    }
  }

  return errors;
};
