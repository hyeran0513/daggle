import { useReducer } from "react";

const initialState = {
  id: "",
  password: "",
  errors: {},
  placeholder: {
    id: "아이디를 입력해주세요.",
    password: "비밀번호를 입력해주세요.",
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_ID":
      return {
        ...state,
        id: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
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

export const useAuthForm = () => {
  return useReducer(formReducer, initialState);
};
