type Episode = {
  mal_id: number;
  title: string;
  episode: string;
  url: string;
  images: Images;
};

type Images = {
  jpg: Jpg;
};

type Jpg = {
  image_url: null;
};

export default Episode;
