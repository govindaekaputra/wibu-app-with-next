import Pagination from "./pagination";
import { Review } from "./review";

export type ReviewsResponse = {
  pagination: Pagination;
  data: Review[];
};
