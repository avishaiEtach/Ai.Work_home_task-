import { Button } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { HISTORY_LOCAL_STORAGE_KEY } from "../../../assets/styles/configs";
import Axios from "axios";

export const useVideo = ({ setChosenVideo, setInputValue }: useVideoProps) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async (q = "") => {
    const res = await Axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_GOOGLE_API}&type=video&part=snippet&q=${q}`
    );
    const items: YouTubeItem[] = res.data.items;
    let videosToShow: Video[] = [];
    for (let i = 0; i < items.length; i++) {
      const statistics: Statistics = (
        await Axios.get(
          `https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_GOOGLE_API}&id=${items[i].id.videoId}&part=snippet,statistics`
        )
      ).data;

      const video: Video = {
        snippet: {
          id: { ...items[i].id },
          title: items[i].snippet.title,
          thumbnail: items[i].snippet.thumbnails.default.url,
          statistics: +statistics.items[0].statistics.likeCount,
        },
        mute: 1,
        autoplay: 0,
      };
      videosToShow.push(video);
    }
    setVideos(videosToShow);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    if (value) {
      debouncedFetchVideos(value);
    }
    setInputValue(value);
  };

  const debouncedFetchVideos = useCallback(
    debounce((q) => getVideos(q), 1500),
    []
  );

  const OnPlay = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: Video
  ) => {
    ev.stopPropagation();
    setChosenVideo({ ...item, mute: 0, autoplay: 1 });
    setInputValue(item.snippet.title);
    const history: Video[] = JSON.parse(
      localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY) ?? "[]"
    );
    if (history.length) {
      const find = history.find(
        (historyItem) =>
          item.snippet.id.videoId === historyItem.snippet.id.videoId
      );
      if (!find) {
        history.push(item);
        localStorage.setItem(
          HISTORY_LOCAL_STORAGE_KEY,
          JSON.stringify(history)
        );
      }
    } else {
      localStorage.setItem(
        HISTORY_LOCAL_STORAGE_KEY,
        JSON.stringify([{ ...item, mute: 0, autoplay: 1 }])
      );
    }
  };

  const renderOption = (props: any, option: Video) => {
    return (
      <div className="option-container" key={props.key}>
        <div className="flex g20">
          <div>
            <img src={option.snippet.thumbnail} alt="" />
          </div>
          <div className="flex column">
            <span className="option-title">{option.snippet.title}</span>
            <span className="option-votes">
              {new Intl.NumberFormat("en", {
                style: "decimal",
                currency: "USD",
              }).format(option.snippet.statistics)}
            </span>
          </div>
        </div>
        <Button
          variant="contained"
          className="option-button"
          data-option-index={props["data-option-index"]}
          onClick={(ev) => {
            OnPlay(ev, option);
            props.onClick(ev);
          }}
        >
          play
        </Button>
      </div>
    );
  };

  return { videos, handleInputChange, renderOption };
};
