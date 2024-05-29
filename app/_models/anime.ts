import Genre from "./genre";

type Anime = {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  genres: Genre[];
};

type Aired = {
  from: string;
  to: string;
  prop: Prop;
};

type Prop = {
  from: From;
  to: From;
  string: string;
};

type From = {
  day: number;
  month: number;
  year: number;
};

type Broadcast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

type Image = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

type Title = {
  type: string;
  title: string;
};

type Trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
};

export default Anime;
