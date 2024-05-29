import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getTopAnime } from "../_services/top-anime";
import Anime from "@/app/_models/anime";

export default function useTopAnime(props: { type: string }) {
  const { type } = props;
  const [page, setPage] = useState(1);
  const [isFetchData, setIsFetchData] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [data, setData] = useState<Anime[]>([]);

  const fetchTopAnime = useCallback(async () => {
    try {
      setIsFetchData(true);
      const res = await getTopAnime(type, page);
      setErrMessage(null);
      setHasNextPage(res.pagination.has_next_page);
      setPage(res.pagination.current_page + 1);
      setData((prev) => {
        if (prev.length > 0) {
          return prev.concat(res.data);
        } else {
          return res.data;
        }
      });
    } catch (error: any) {
      setErrMessage(error.message);
      setHasNextPage(false);
    } finally {
      setIsFetchData(false);
    }
  }, [page, type]);

  useEffect(() => {
    fetchTopAnime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isFetchData, data, hasNextPage, errMessage, fetchTopAnime };
}
