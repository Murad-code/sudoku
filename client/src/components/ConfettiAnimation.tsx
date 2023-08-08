import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import React, { useEffect } from "react";
import Confetti from "react-dom-confetti";

const confettiConfig = {
  angle: 90,
  spread: 700,
  startVelocity: 30,
  elementCount: 300,
  dragFriction: 0.12,
  duration: 5000,
  stagger: 5,
  width: "10px",
  height: "10px",
  colors: ["#44C997", "#F06595", "#FFC35F", "#6C63FF"],
  origin: { x: 0.5, y: 0.1 },
};

const ConfettiAnimation = () => {
  const { isComplete } = useSudokuGridStore();
  useEffect(() => {
    if (isComplete) {
      // Start the confetti animation when isComplete is true
      setConfettiActive(true);
      setTimeout(() => {
        setConfettiActive(false); // Stop the confetti after 3 seconds
      }, 3000);
    }
  }, [isComplete]);

  const [confettiActive, setConfettiActive] = React.useState(false);

  return (
    <div className="confetti-container" style={{ zIndex: 100 }}>
      <Confetti active={confettiActive} config={confettiConfig} />
    </div>
  );
};

export default ConfettiAnimation;
