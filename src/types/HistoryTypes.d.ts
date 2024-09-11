import { MyCustomGlobal } from "./classes";

declare global {
  interface HistoryProps {
    setChosenVideo: any;
    chosenVideo: any;
    setInputValue: any;
  }
  interface useHistoryProps {
    setChosenVideo: any;
    chosenVideo: any;
  }
}
