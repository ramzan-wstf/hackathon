import ReactPlayer from "react-player";

export default function AudioPlayer({play}: {play: boolean;}) {

  return (
    <div>
      <ReactPlayer url={"/music.mp3"} playsinline playing={play}/>
    </div>
  );
}
