"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import AudioPlayer from "../../components/AudioPlayer";
import ChatWindow from "../../components/ChatWindow";
import LandingPage from "../../components/LandingPage";
import { validateChatId } from "@/src/backendServices/userServices";
import GameComponent from "@/src/components/GameComponent";
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/src/redux/features/userDetailsSlice";

export default function Home({ params }: { params: { chatId: string } }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [play, setPlay] = useState(false);
  const [page, setPage] = useState("landing");
  const [isMute, setIsMute] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.user);
  // console.log
  console.log(user, 'user');

  const getData = async () => {
    try {
      const data = await validateChatId(params?.chatId);
      // console.log(data, 'data');
      setLoading(false);
      if (data && data?.data) {
        dispatch(setUser(data?.data));
        // console.log(data?.data, 'data')
        if (data?.data?.points != null && data?.data?.points >= 0) {
          dispatch(setUser({ ...data?.data, points: data?.data?.points }))
        } else {
          setError(true);
        }
      }
      else {
        setError(true);
      }

    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {error ? (
        <div className="flex justify-center h-screen items-center">
          <p>Please Login through Telegram</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center h-screen items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="h-screen overflow-hidden">
          {page === "landing" ? (
            <LandingPage chatId={params?.chatId} setPage={setPage} setPlay={setPlay} />
          ) : (
            <GameComponent
              play={play}
              setPlay={setPlay}
              setMute={setIsMute}
              mute={isMute}
              setPage={setPage}
              score={user?.points}
              chatId={params?.chatId}
            />
          )}
        </div>
      )}
    </>
  );
}
