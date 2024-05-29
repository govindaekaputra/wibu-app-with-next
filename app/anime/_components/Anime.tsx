"use client";

import Card from "@/app/_components/Card";
import { useSearchAnime } from "@/app/_search/_hooks/useSearchAnime";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Anime() {
  const searchParams = useSearchParams();
  const initQuery = searchParams.get("q") || "";
  const initGenres = searchParams.get("genres") || "";
  const initPage = searchParams.get("page") || "1";
  const { isFetchData, data, errMessage, hasNextPage, fetchSearchAnime } =
    useSearchAnime();
  const router = useRouter();

  useEffect(() => {
    fetchSearchAnime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initQuery, initGenres, initPage]);

  return (
    <InfiniteScroll
      next={fetchSearchAnime}
      hasMore={hasNextPage}
      loader={<p className="text-center text-white">Loading...</p>}
      dataLength={data.length}
      className="p-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {!errMessage && !isFetchData && data.length == 0 ? (
          <h1 className="text-lg text-white text-center">Anime not found</h1>
        ) : (
          data.map((anime) => (
            <Card
              key={anime.mal_id}
              image={anime.images["webp"].large_image_url}
              title={anime.title}
              description={anime.synopsis}
              tags={anime.genres.map((genre) => ({
                id: genre.mal_id,
                name: genre.name,
              }))}
              onClick={() => {
                router.push(`/anime/${anime.mal_id}`);
              }}
            />
          ))
        )}
        {errMessage && <p className="text-center text-white">{errMessage}</p>}
      </div>
    </InfiniteScroll>
  );
}
