import { useEffect, useRef, useState } from "react";

export function useSectionStage<T extends HTMLElement = HTMLElement>(
  rootMargin = "200px 0px",
  threshold = 0.02
) {
  const ref = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return { ref, isActive };
}
