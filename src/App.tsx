import { useState } from "react";
import { Video } from "./components/Video/Video";
import { History } from "./components/History/History";
import { START_VIDEO_ID } from "./assets/styles/configs";

export function App() {
  const [chosenVideo, setChosenVideo] = useState<Video>({
    snippet: {
      id: { kind: "youtube#video", videoId: START_VIDEO_ID },
      title: "",
      thumbnail: "",
      statistics: 0,
    },
    mute: 1,
    autoplay: 0,
  });
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="main-container">
      <History
        chosenVideo={chosenVideo}
        setChosenVideo={setChosenVideo}
        setInputValue={setInputValue}
      />
      <Video
        chosenVideo={chosenVideo}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setChosenVideo={setChosenVideo}
      />
    </div>
  );
}
