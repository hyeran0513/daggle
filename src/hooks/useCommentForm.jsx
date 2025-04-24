import { useReducer } from "react";

const initialState = {
  comment: "",
  errors: {},
  placeholder: {
    comment: "댓글을 통해 자유롭게 의견을 나눠보세요",
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENT":
      return {
        ...state,
        comment: action.payload,
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

export const useCommentForm = () => {
  return useReducer(formReducer, initialState);
};
