import { useEffect, useRef, useState } from "react";

const useInfiniteScrolling = (fetchData) => {
  const [page, setPage] = useState(0);
  const observerTarget = useRef(null);
  //maybe use a callback function for effiency
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchData(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 1 },
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);
  return {
    observerTarget,
  };
};

export default useInfiniteScrolling;
