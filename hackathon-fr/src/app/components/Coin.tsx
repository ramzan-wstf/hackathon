import { useState } from "react";

export default function Coin({ onCoinReachTop }: {onCoinReachTop: any}) {
  const [isMovingUp, setIsMovingUp] = useState(false);

  const handleCoinClick = () => {
    setIsMovingUp(true);
    setTimeout(() => {
      onCoinReachTop();
      setIsMovingUp(false);
    }, 2000);
  };

  return (
    <div
      className={`absolute bottom-0 w-16 h-16 bg-yellow-500 rounded-full cursor-pointer transform ${
        isMovingUp
          ? "transition-all duration-2000 ease-in-out transform translate-y-[-90vh]"
          : ""
      }`}
      onClick={handleCoinClick}
    >
      <div className="w-full h-full flex items-center justify-center">
        <span className="animate-spinCoin">💰</span>
      </div>
    </div>
  );
}