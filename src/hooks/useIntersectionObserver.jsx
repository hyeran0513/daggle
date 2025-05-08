import { useEffect, useRef } from "react";

const useIntersectionObserver = (callback, hasNextPage, isFetchingNextPage) => {
  const observerRef = useRef(null);

  useEffect(() => {
    // 다음 페이지가 없거나 데이터를 가져오는 중이면 실행X
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 대상 요소가 뷰포트에 진입했는지 확인
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
