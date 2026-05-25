import { useRef, useState, useEffect } from "react";

export const useAlertDismiss = () => {
  const [mounted, setMounted] = useState(false);

  const boxRef = useRef(null);

  const handleClick = () => {
    if (!boxRef.current) return;
    console.log(boxRef.current);
    boxRef.current.classList.remove("scale-100");
    boxRef.current.classList.add("scale-0");

    const handleTransitionEnd = () => {
      boxRef.current?.remove();

      boxRef.current?.removeEventListener("transitionend", handleTransitionEnd);
    };

    boxRef.current.addEventListener("transitionend", handleTransitionEnd);
  };

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      handleClick();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return {
    boxRef,
    mounted,
    handleClick,
  };
};

export default useAlertDismiss;
