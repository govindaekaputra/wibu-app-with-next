"use client";

import useTopAnime from "../_hooks/useTopAnime";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "@/app/_components/Card";
import { useRouter, useSearchParams } from "next/navigation";

export default function TopAnime() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "tv";
  const { isFetchData, data, hasNextPage, errMessage, fetchTopAnime } =
    useTopAnime({ type });
  const router = useRouter();

  return (
    <InfiniteScroll
      next={fetchTopAnime}
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
