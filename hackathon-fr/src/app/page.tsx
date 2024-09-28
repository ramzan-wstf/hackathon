"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [click, setClick] = useState(0);
  const handleClickk = () => {};
  return (
    <div className="bg-black text-white relative">
      {/* <audio playsInline autoPlay src="/music.mp3" controls></audio> */}
      {/* <p className="text-xl absolute bottom-[20vh] text-center w-full">coin</p>
       */}
      <div className="flex justify-center w-full absolute bottom-[20vh]">
        <Image src={"/coin.jpeg"} alt="coin" width={30} height={30} />
      </div>
      <div className="h-[50vh] bg-red-500 flex justify-center items-center">
        <p>Here is the rabit</p>
      </div>
      <div className="bg-blue-500 h-[50vh]"></div>
    </div>
  );
}
