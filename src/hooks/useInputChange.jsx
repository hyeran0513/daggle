import { useCallback } from "react";

const useInputChange = (dispatch) => {
  const handleInputChange = useCallback(
    (field, options = {}) =>
      (e) => {
        const value = e.target.value;

        dispatch({ type: `SET_${field.toUpperCase()}`, payload: value });
        dispatch({ type: "CLEAR_ERROR", payload: field });

        if (options.onChange) {
          options.onChange(value);
        }
      },
    [dispatch]
  );

  return handleInputChange;
};

export default useInputChange;
