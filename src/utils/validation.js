export const validateForm = (state) => {
  const errors = {};

  if (!state.title || state.title.trim() === "") {
    errors.title = "최소 1자 이상 입력해주세요.";
  }

  if (!state.content || state.content.trim() === "") {
    errors.content = "최소 10자 이상 입력해주세요.";
  }

  return errors;
};
