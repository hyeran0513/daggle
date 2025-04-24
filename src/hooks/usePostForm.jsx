import { useReducer } from "react";

const initialState = {
  title: "",
  content: "",
  errors: {
    title: "최소 1자 이상 입력해주세요.",
    content: "최소 10자 이상 입력해주세요.",
  },
  placeholder: {
    title: "제목을 입력해주세요",
    content: "내용을 입력해주세요",
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "SET_CONTENT":
      return {
        ...state,
        content: action.payload,
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload]: "",
        },
      };
    default:
      return state;
  }
};

export const usePostForm = () => {
  return useReducer(formReducer, initialState);
};
