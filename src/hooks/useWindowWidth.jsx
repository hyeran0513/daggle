import { useState, useEffect } from "react";

const useWindowWidth = (breakpoint) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 리사이즈 시 상태 업데이트
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth < breakpoint;
};

export default useWindowWidth;
