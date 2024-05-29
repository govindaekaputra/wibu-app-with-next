"use client";

import Slider from "react-slick";
import Anime from "@/app/_models/anime";
import { TextButton } from "@/app/_components/Button";
import Card from "@/app/_components/Card";
import { useRouter } from "next/navigation";
import useTopAnime from "@/app/top-anime/_hooks/useTopAnime";

export default function Home() {
  const { isFetchData: isFetchDataTV, data: topAnimesTV } = useTopAnime({
    type: "tv",
  });
  const { isFetchData: isFetchDataMovie, data: topAnimesMovie } = useTopAnime({
    type: "movie",
  });
  const router = useRouter();
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <h1 className="mb-3 text-2xl font-semibold text-white">Top Anime TV</h1>
        <TextButton
          text="View all"
          onClick={(e) => {
            router.push(`/top-anime?type=tv`);
          }}
        />
      </div>
      {isFetchDataTV ? (
        <p className="text-center text-white">Loading...</p>
      ) : (
        <Slider
          slidesToShow={4}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 639,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
          className="mx-6"
        >
          {topAnimesTV.map((anime) => (
            <div key={anime.mal_id} className="px-3 h-full">
              <Card
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
            </div>
          ))}
        </Slider>
      )}
      <hr className="my-6" />
      <div className="flex items-center justify-between">
        <h1 className="mb-3 text-2xl font-semibold text-white">
          Top Anime Movie
        </h1>
        <TextButton
          text="View all"
          onClick={(e) => {
            router.push(`/top-anime?type=movie`);
          }}
        />
      </div>
      {isFetchDataMovie ? (
        <p className="text-center text-white">Loading...</p>
      ) : (
        <Slider
          slidesToShow={4}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 639,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
          className="mx-6"
        >
          {topAnimesMovie.map((anime) => (
            <div key={anime.mal_id} className="px-3 h-full">
              <Card
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
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
