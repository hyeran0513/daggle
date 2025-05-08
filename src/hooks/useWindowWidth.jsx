import { useState, useEffect } from "react";

const useWindowWidth = (breakpoint) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // window 객체가 존재하는지 확인
      if (typeof window !== "undefined") {
        // 현재 창 너비를 저장
        setWindowWidth(window.innerWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 현재 창 너비가 breakpoint보다 작은지 여부를 반환
  return windowWidth < breakpoint;
};

export default useWindowWidth;
