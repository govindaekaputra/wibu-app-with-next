export type RecommendationListResponse = {
  data: Recommendation[];
};

export type Recommendation = {
  entry: Entry;
};

type Entry = {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  title: string;
};

type Image = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};
