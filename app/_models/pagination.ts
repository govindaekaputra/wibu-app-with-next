type Pagination = {
  current_page: number;
  last_visible_page: number;
  has_next_page: boolean;
  items: Items;
};

type Items = {
  count: number;
  total: number;
  per_page: number;
};

export default Pagination;
