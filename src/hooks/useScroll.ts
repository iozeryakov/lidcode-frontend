import { MutableRefObject, useEffect } from "react";

export function useScroll(
  childRef: MutableRefObject<null>,
  callback: { (): void }
) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (childRef.current) {
      observer.observe(childRef.current);
    }

    return function () {
      observer.disconnect();
    };
  }, [childRef]);
}
