"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CodeDragonsCanvas = dynamic(
  () =>
    import("./CodeDragonsCanvas").then((mod) => ({
      default: mod.CodeDragonsCanvas,
    })),
  { ssr: false }
);

export function DeferredCodeDragons() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    let mounted = false;
    const activate = () => {
      if (mounted) return;
      mounted = true;
      setShouldMount(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", activate);
      window.removeEventListener("pointermove", activate);
      window.removeEventListener("touchstart", activate);
      window.removeEventListener("keydown", activate);
    };

    window.addEventListener("scroll", activate, { passive: true, once: true });
    window.addEventListener("pointermove", activate, {
      passive: true,
      once: true,
    });
    window.addEventListener("touchstart", activate, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", activate, {
      passive: true,
      once: true,
    });

    // Fallback: jika tidak ada interaksi, muat saat idle setelah LCP selesai
    const timer = setTimeout(activate, 3500);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, []);

  if (!shouldMount) return null;
  return <CodeDragonsCanvas />;
}

