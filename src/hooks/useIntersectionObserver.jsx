import { useEffect, useRef } from "react";

const useIntersectionObserver = (callback, hasNextPage, isFetchingNextPage) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    // 요소를 감시하기 시작
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      // 컴포넌트가 언마운트되면 감시를 중지
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [callback, hasNextPage, isFetchingNextPage]);

  return observerRef;
};

export default useIntersectionObserver;
