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

  const [leftPartOffsetX, setLeftPartOffsetX] = useState(0);
  const [feedRootWidth, setFeedRootWidth] = useState(0);

  const handleLoad = () => {
    setLeftPartOffsetX(getClientRect("#left-part")?.x);
    setFeedRootWidth(getClientRect("#feed-root")?.width);
  };

  const handleResize = () => {
    setLeftPartOffsetX(getClientRect("#left-part")?.x);
    setFeedRootWidth(getClientRect("#feed-root")?.width);
  };

  return { fixed, feedRootWidth, leftPartOffsetX };
};

export default useWindowProp;
