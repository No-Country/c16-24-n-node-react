import { useEffect, useState } from "react";

const useInfiniteScroll = (ref, callback) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          if (hasMore) {
            callback(page);
          }
        }
      },
      {
        threshold: 0.9,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [callback]);

  return { page, hasMore, setHasMore, setPage };
};

export default useInfiniteScroll;
