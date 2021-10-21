import { useState, useEffect } from "react";

const useWindowProp = () => {
  useEffect(() => {
    window.addEventListener("load", handleLoad);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [fixed, setFixed] = useState(false);
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 70) setFixed(true);
    else setFixed(false);
  };

  const getClientRect = (id) => {
    const dom = document.querySelector(id);
    return dom?.getBoundingClientRect();
  };

  const [rightPartOffsetX, setRightPartOffsetX] = useState(0);

  const handleLoad = () => {
    setRightPartOffset();
  };

  const handleResize = () => {
    setRightPartOffset();
  };

  const setRightPartOffset = () => {
    const leftPartOffsetX = getClientRect("#left-part")?.x;
    const feedRootWidth = getClientRect("#feed-root")?.width;
    setRightPartOffsetX(leftPartOffsetX + 270 + 2*24 + feedRootWidth);
  }

  return { fixed, rightPartOffsetX };
};

export default useWindowProp;
