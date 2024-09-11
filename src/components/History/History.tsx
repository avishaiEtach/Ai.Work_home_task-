import { Button } from "@mui/material";
import { useHistory } from "./hooks/useHistory";
import "./History.scss";

export const History = ({
  chosenVideo,
  setChosenVideo,
  setInputValue,
}: HistoryProps) => {
  const { history, onClickHistory, onDelateVideoFromHistory } = useHistory({
    chosenVideo,
    setChosenVideo,
  });

  return (
    <div className="history">
      <h2>History</h2>
      {history.map((item: Video, index: number) => (
        <div key={index} className="history-item ">
          <img src={item.snippet.thumbnail} alt="" />
          <span
            onClick={(ev) => {
              onClickHistory(ev, item);
              setInputValue(item.snippet.title);
            }}
          >
            {item.snippet.title}
          </span>
          <Button
            onClick={() => {
              onDelateVideoFromHistory(item.snippet.id.videoId);
            }}
            variant="contained"
            className="history-button"
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};
