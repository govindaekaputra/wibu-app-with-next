import Pagination from "./pagination";
import Episode from "./episode";

type EpidodesResponse = {
  pagination: Pagination;
  data: Episode[];
};

export default EpidodesResponse;
