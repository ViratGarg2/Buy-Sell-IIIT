import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

// Ensure you have the dollar image in the appropriate path
import dollarImage from "./dollar4.png"; // Or use a URL like "https://path.to/dollar.png"

const Cursor = styled("div")({
  position: "fixed",
  width: "30px",  // Adjust size as per the image dimensions
  height: "30px", // Adjust size as per the image dimensions
  pointerEvents: "none",
  transform: "translate(-50%, -50%)",
  boxShadow: "0px 0px 5px 5px rgba(250, 250, 0, 0.5)",
  zIndex: 9999,
  borderRadius: "50%",
});

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Cursor style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}>
      <img src={dollarImage} alt="dollar" style={{ width: "100%", height: "100%" }} />
    </Cursor>
  );
};

export default CustomCursor;
