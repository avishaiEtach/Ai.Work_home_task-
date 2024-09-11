import { MyCustomGlobal } from "./classes";

declare global {
  interface Video {
    snippet: {
      id: { kind: string; videoId: string };
      title: string;
      thumbnail: string;
      statistics: number;
    };
    mute: number;
    autoplay: number;
  }
  interface VideoProps {
    chosenVideo: any;
    setChosenVideo: any;
    inputValue: any;
    setInputValue: any;
  }

  interface useVideoProps {
    setChosenVideo: any;
    setInputValue: any;
  }
  interface Statistics {
    kind: string;
    etag: string;
    items: Item[];
    pageInfo: PageInfo;
  }
}

interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

export interface Standard {
  url: string;
  width: number;
  height: number;
}

export interface Maxres {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}

export interface Statistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
