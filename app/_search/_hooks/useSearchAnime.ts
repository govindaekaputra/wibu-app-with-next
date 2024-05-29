import { useCallback, useState } from "react";
import { getGenres, getSearchAnime } from "../_services/search-anime";
import Anime from "@/app/_models/anime";
import { useSearchParams } from "next/navigation";
import Genre from "@/app/_models/genre";

export function useSearchAnime() {
  const searchParams = useSearchParams();
  const initQuery = searchParams.get("q") || "";
  const initGenres = (searchParams.get("genres") || "")
    .split(",")
    .map((genre) => parseInt(genre))
    .filter((genre) => genre);
  const initPage = parseInt(searchParams.get("page") || "1");
  const [query, setQuery] = useState(initQuery);
  const [genres, setGenres] = useState<number[]>(initGenres);
  const [genresOptions, setGenresOptions] = useState<Genre[]>([]);
  const [isFetchData, setIsFetchData] = useState(true);
  const [data, setData] = useState<Anime[]>([]);
  const [page, setPage] = useState<number>(initPage);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [errMessage, setErrMessage] = useState<String>();
  const updateQuery = (value: string) => {
    setQuery(value);
  };
  const updateGenres = (value: number) => {
    setGenres((prev) => {
      const arr = [...prev];
      const index = arr.findIndex((curr) => curr === value);
      if (index != -1) {
        arr.splice(index, 1);
      } else {
        arr.push(value);
      }
      return arr;
    });
  };
  const fetchSearchAnime = useCallback(async () => {
    try {
      setIsFetchData(true);
      const result = await getSearchAnime(query, genres, page);
      setErrMessage(undefined);
      setData((prev) => (page > 1 ? prev.concat(result.data) : result.data));
      setPage(result.pagination.current_page + 1);
      setHasNextPage(result.pagination.has_next_page);
    } catch (error: any) {
      setErrMessage(error.message);
      setHasNextPage(false);
    } finally {
      setIsFetchData(false);
    }
  }, [genres, page, query]);
  const fetchGenres = useCallback(async () => {
    try {
      const result = await getGenres();
      setGenresOptions(result.data);
    } catch (error: any) {
      setErrMessage(error.message);
    }
  }, []);

  return {
    isFetchData,
    data,
    errMessage,
    hasNextPage,
    query,
    genres,
    genresOptions,
    updateQuery,
    updateGenres,
    fetchSearchAnime,
    fetchGenres,
  };
}
