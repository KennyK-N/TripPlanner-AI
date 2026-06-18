import { useEffect, useRef, useState } from "react";

export default function useInfiniteScrolling(fetchData, loading) {
  const observerTarget = useRef(null);
  const [page, setPage] = useState(0);

  function fetchNextPage() {
    if (loading) return;

    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(nextPage);
      return nextPage;
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        fetchNextPage();
      }
    });

    const target = observerTarget.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loading, observerTarget]);
  return {
    observerTarget,
    page,
  };
}
