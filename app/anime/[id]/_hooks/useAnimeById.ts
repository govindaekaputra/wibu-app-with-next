import { useCallback, useEffect, useState } from "react";
import Anime from "@/app/_models/anime";
import {
  getAnimeById,
  getAnimeRecommendationsById,
  getAnimeReviewsById,
  getAnimeVideoEpisodesById,
} from "../_services/anime-by-id";
import Episode from "@/app/_models/episode";
import { Review } from "@/app/_models/review";
import { Recommendation } from "@/app/_models/recommendation";

export function useAnimeById(id: string) {
  const [data, setData] = useState<Anime>();
  const [errMessage, setErrMessaage] = useState<String>();
  useEffect(() => {
    getAnimeById(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setErrMessaage(err.message);
      });
  }, [id]);
  return { data, errMessage };
}

export function useAnimeVideoEpisodesById(id: string) {
  const [data, setData] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const incrementPageHandler = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const fetchVideoEpisodesById = useCallback(async () => {
    try {
      const res = await getAnimeVideoEpisodesById(id, page.toString());
      setData((prev) => (page > 1 ? prev.concat(res.data) : res.data));
      setHasNextPage(res.pagination.has_next_page);
    } catch (error: any) {}
  }, [id, page]);

  useEffect(() => {
    fetchVideoEpisodesById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { data, hasNextPage, fetchVideoEpisodesById, incrementPageHandler };
}

export function useAnimeReviewsById(id: string) {
  const [data, setData] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const incrementPageHandler = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const fetchReviewsById = useCallback(async () => {
    try {
      const res = await getAnimeReviewsById(id, page.toString());
      setData((prev) => (page > 1 ? prev.concat(res.data) : res.data));
      setHasNextPage(res.pagination.has_next_page);
    } catch (error: any) {}
  }, [id, page]);

  useEffect(() => {
    fetchReviewsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { data, hasNextPage, fetchReviewsById, incrementPageHandler };
}

export function useAnimeRecommendationsById(id: string) {
  const [data, setData] = useState<Recommendation[]>([]);

  const fetchRecommendationsById = useCallback(async () => {
    try {
      const res = await getAnimeRecommendationsById(id);
      setData(res.data);
    } catch (error: any) {}
  }, [id]);

  useEffect(() => {
    fetchRecommendationsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, fetchRecommendationsById };
}
