export const validateForm = (state) => {
  const errors = {};

  // 아이디
  if (!state.id || state.id.trim() === "") {
    errors.id = "아이디를 입력해주세요.";
  }

  // 비밀번호
  if (!state.password || state.password.trim() === "") {
    errors.password = "비밀번호를 입력해주세요.";
  }

  // 제목
  if (!state.title || state.title.trim() === "") {
    errors.title = "최소 1자 이상 입력해주세요.";
  }

  // 내용
  if (!state.content || state.content.trim() === "") {
    errors.content = "최소 10자 이상 입력해주세요.";
  }

  return errors;
};
