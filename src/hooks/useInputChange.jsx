import { useCallback } from "react";
import { ACTION_TYPES } from "../constants/actionTypes";

const useInputChange = (dispatch) => {
  const handleInputChange = useCallback(
    (field, options = {}) =>
      (e) => {
        const value = e.target.value;

        const actionType = ACTION_TYPES[field];

        if (actionType) {
          dispatch({ type: actionType, payload: value });
          dispatch({ type: "CLEAR_ERROR", payload: field });
        }

        if (options.onChange) {
          options.onChange(value);
        }
      },
    [dispatch]
  );

  return handleInputChange;
};

export default useInputChange;
