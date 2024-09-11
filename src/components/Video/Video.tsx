import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useVideo } from "./hooks/useVideo";
import "./Video.scss";

export const Video = ({
  chosenVideo,
  setChosenVideo,
  inputValue,
  setInputValue,
}: VideoProps) => {
  const { videos, handleInputChange, renderOption } = useVideo({
    setChosenVideo,
    setInputValue,
  });

  return (
    <div className="video-container">
      <Autocomplete
        className="input"
        fullWidth
        disablePortal
        options={videos}
        inputValue={inputValue}
        getOptionLabel={(option: Video) => option?.snippet?.title ?? ""}
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField
            onChange={(ev) => {
              handleInputChange(ev);
            }}
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: <SearchIcon />,
            }}
            value={inputValue}
            label="Search on Youtube"
          />
        )}
      />
      <iframe
        id="ytplayer"
        title="ytplayer"
        className="player"
        height="360"
        loading="lazy"
        allow="accelerometer;autoplay"
        src={`https://www.youtube.com/embed/${chosenVideo.snippet.id.videoId}?autoplay=${chosenVideo.autoplay}&mute=${chosenVideo.mute}`}
      ></iframe>
    </div>
  );
};
