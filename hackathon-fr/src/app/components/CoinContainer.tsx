import { useState } from "react";
import Coin from "./Coin";

export default function CoinContainer() {
  const [coinCount, setCoinCount] = useState(0);
  const [coins, setCoins] = useState<any>([]);

  const handleCoinReachTop = () => {
    setCoinCount(coinCount + 1);
  };

  const addNewCoin = () => {
    setCoins((prevCoins: any) => [
      ...prevCoins,
      <Coin key={prevCoins.length} onCoinReachTop={handleCoinReachTop} />,
    ]);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Coin count box at the top */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white p-4 rounded">
        Coins at top: {coinCount}
      </div>

      {/* Clickable area to generate new coins */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={addNewCoin}
          className="bg-yellow-500 text-white p-4 rounded-full shadow-lg"
        >
          Add Coin
        </button>
      </div>

      {/* Coins on the screen */}
      <div className="relative w-full h-full">{coins}</div>
    </div>
  );
}
