import Anime from "./anime";
import Pagination from "./pagination";

type AnimeListResponse = {
  data: Anime[];
  pagination: Pagination;
};

export default AnimeListResponse;
