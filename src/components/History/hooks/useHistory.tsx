import { useEffect, useState } from "react";
import { HISTORY_LOCAL_STORAGE_KEY } from "../../../assets/styles/configs";

export const useHistory = ({
  setChosenVideo,
  chosenVideo,
}: useHistoryProps) => {
  const [history, setHistory] = useState<Video[]>(
    JSON.parse(localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY) ?? "[]")
  );

  useEffect(() => {
    setHistory(
      JSON.parse(localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY) ?? "[]")
    );
  }, [chosenVideo]);

  const onClickHistory = (
    ev: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: Video
  ) => {
    ev.stopPropagation();
    setChosenVideo({ ...item, mute: 0, autoplay: 1 });
  };

  const onDelateVideoFromHistory = (itemId: string) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter(
        (historyItem) => itemId !== historyItem.snippet.id.videoId
      );
      localStorage.setItem(
        HISTORY_LOCAL_STORAGE_KEY,
        JSON.stringify(newHistory)
      );
      return newHistory;
    });
  };

  return { history, onClickHistory, onDelateVideoFromHistory };
};
