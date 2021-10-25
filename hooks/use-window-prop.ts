import { useState, useEffect } from "react";

const useWindowProp = () => {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  return { fixed };
};

export default useWindowProp;
