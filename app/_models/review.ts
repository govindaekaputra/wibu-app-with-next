export type Review = {
  mal_id: number;
  url: string;
  type: Type;
  reactions: Reactions;
  date: Date;
  review: string;
  score: number;
  tags: Tag[];
  is_spoiler: boolean;
  is_preliminary: boolean;
  episodes_watched: null;
  user: User;
};

type Reactions = {
  overall: number;
  nice: number;
  love_it: number;
  funny: number;
  confusing: number;
  informative: number;
  well_written: number;
  creative: number;
};

enum Tag {
  MixedFeelings = "Mixed Feelings",
  NotRecommended = "Not Recommended",
  Recommended = "Recommended",
}

enum Type {
  Anime = "anime",
}

type User = {
  url: string;
  username: string;
  images: { [key: string]: Image };
};

type Image = {
  image_url: string;
};
