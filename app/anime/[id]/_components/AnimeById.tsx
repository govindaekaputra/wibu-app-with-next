"use client";

import Image from "next/image";
import moment from "moment";
import {
  useAnimeById,
  useAnimeRecommendationsById,
  useAnimeReviewsById,
  useAnimeVideoEpisodesById,
} from "../_hooks/useAnimeById";
import { Fragment } from "react";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import Card from "@/app/_components/Card";
import Slider from "@/app/_components/Slider";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};
export default function AnimeById(props: Props) {
  const { id } = props;
  const router = useRouter();
  const { data, errMessage } = useAnimeById(id);
  const {
    data: videoEpisodes,
    hasNextPage: hasMoreVideoEpisodes,
    incrementPageHandler: incrementPageVideoEpisodesHandler,
  } = useAnimeVideoEpisodesById(id);
  const {
    data: reviews,
    hasNextPage: hasMoreReviews,
    incrementPageHandler: incrementPageReviewsHandler,
  } = useAnimeReviewsById(id);
  const { data: recommandations } = useAnimeRecommendationsById(id);

  return data ? (
    <>
      <div className="w-full h-[400px] relative">
        <Image
          src={data.images["webp"].large_image_url}
          fill
          alt={data.title}
          className="object-contain z-[2]"
        />
        <Image
          src={data.images["webp"].large_image_url}
          fill
          alt={data.title}
          className="absolute object-cover blur z-[1]"
        />
      </div>
      <div className="text-white p-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold">{`${data.title} | ${data.title_japanese}`}</h1>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl border-[1px] border-gray-400 w-fit p-3 bg-white text-black">
              {data.type}
            </h3>
            <h3 className="text-2xl bg-white text-black p-3 w-fit ml-auto">
              {data.score}
            </h3>
          </div>
        </div>
        <h3>{data.rating}</h3>
        <p className="mb-3 text-gray-300">{data.synopsis}</p>
        {data.genres.length > 0 && (
          <ul className="flex flex-wrap items-center gap-3 mb-3">
            {data.genres.map((genre) => (
              <li
                key={genre.mal_id}
                className="border-[1px] border-gray-400 px-3 py-1 bg-white text-black"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        )}
        {/* information and trailer */}
        <div className="w-full block md:flex gap-3 items-center mb-3">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Aired</p>
              <p>{`${
                data.aired.from
                  ? moment(new Date(data.aired.from)).format("DD MMM YYYY")
                  : "???"
              } - ${
                data.aired.to
                  ? moment(new Date(data.aired.to)).format("DD MMM YYYY")
                  : "???"
              }`}</p>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-between">
              <p className="font-semibold">Broadcast</p>
              <p>{data.broadcast.string}</p>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-between">
              <p className="font-semibold">Episodes</p>
              <p>{data.episodes}</p>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-between">
              <p className="font-semibold">Duration</p>
              <p>{data.duration}</p>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-between">
              <p className="font-semibold">Season</p>
              <p>{data.season}</p>
            </div>
            <hr className="my-3" />
          </div>
          <div className="relative w-full md:w-1/3 h-[300px]">
            <iframe
              className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
              src={data.trailer.embed_url}
            />
          </div>
        </div>
        {/* episodes */}
        {videoEpisodes.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-3">Episodes</h3>
            <div className="max-h-[400px] w-full overflow-x-hidden overflow-y-scroll mb-3">
              {videoEpisodes.map((episode, i) => (
                <a
                  key={episode.mal_id}
                  className="border-b-[1px] border-gray-400 text-sm"
                  href={episode.url}
                  target="_blank"
                >
                  <div className="hover:bg-white hover:text-black p-3">
                    <p>{episode.episode}</p>
                    <p>{episode.title}</p>
                  </div>
                </a>
              ))}
              {hasMoreVideoEpisodes && (
                <button
                  className="m-auto block hover:underline"
                  onClick={incrementPageVideoEpisodesHandler}
                >
                  Load more
                </button>
              )}
            </div>
          </>
        )}
        {/* reviews */}
        {reviews.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-3">Reviews</h3>
            <div className="max-h-[400px] w-full overflow-x-hidden overflow-y-scroll">
              {reviews.map((review) => (
                <Fragment key={review.mal_id}>
                  <div className="flex gap-3">
                    <Image
                      src={review.user.images["webp"].image_url}
                      width={60}
                      height={60}
                      alt={review.user.username}
                      className="rounded-full object-cover w-[60px] h-[60px]"
                    />
                    <div className="flex-1">
                      <Rating
                        initialValue={review.score / 2}
                        allowFraction
                        showTooltip
                        tooltipStyle={{ fontSize: 12, marginLeft: 10 }}
                        size={20}
                        SVGstyle={{ display: "inline" }}
                        readonly
                      />
                      <h5 className="font-semibold">{review.user.username}</h5>
                      <p className=" line-clamp-3 text-sm text-gray-300">
                        {review.review}
                      </p>
                      {review.review.trim().length > 200 && (
                        <button
                          className="underline mb-3"
                          onClick={() => {
                            Swal.fire({
                              title: "Review",
                              text: review.review,
                              showCloseButton: true,
                              showConfirmButton: false,
                            });
                          }}
                        >
                          read more
                        </button>
                      )}
                      <div className="flex flex-wrap items-center gap-3">
                        {review.reactions.nice > 0 && (
                          <p className="bg-white border-[1px] border-gray-400 text-black p-3 text-xs">
                            Nice &#128077; {review.reactions.nice}
                          </p>
                        )}
                        {review.reactions.love_it > 0 && (
                          <p className="bg-white border-[1px] border-gray-400 text-black p-3 text-xs">
                            Love it &#128525; {review.reactions.love_it}
                          </p>
                        )}
                        {review.reactions.funny > 0 && (
                          <p className="bg-white border-[1px] border-gray-400 text-black p-3 text-xs">
                            Funny &#128514; {review.reactions.funny}
                          </p>
                        )}
                        {review.reactions.confusing > 0 && (
                          <p className="bg-white border-[1px] border-gray-400 text-black p-3 text-xs">
                            Confusing &#129320; {review.reactions.confusing}
                          </p>
                        )}
                        {review.reactions.informative > 0 && (
                          <p className="bg-white border-[1px] border-gray-400 text-black p-3 text-xs">
                            Informative &#128161; {review.reactions.informative}
                          </p>
                        )}
                        {review.reactions.well_written > 0 && (
                          <p className="bg-white border-[1px] border-gray-400 text-black p-3 text-xs">
                            Well written &#128221;{" "}
                            {review.reactions.well_written}
                          </p>
                        )}
                        {review.reactions.creative > 0 && (
                          <p className="bg-white border-[1px] border-gray-400 text-black p-3 text-xs">
                            Creative &#128308; {review.reactions.creative}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr className="my-3" />
                </Fragment>
              ))}
              {hasMoreReviews && (
                <button
                  className="m-auto block hover:underline"
                  onClick={incrementPageReviewsHandler}
                >
                  Load more
                </button>
              )}
            </div>
          </>
        )}
        {/* recommandations */}
        {recommandations.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-3">Recommendations</h3>
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
              {recommandations.map((recommendation) => (
                <div key={recommendation.entry.mal_id} className="px-3 h-full">
                  <Card
                    image={recommendation.entry.images["webp"].large_image_url}
                    title={recommendation.entry.title}
                    description={""}
                    tags={[]}
                    onClick={() => {
                      router.push(`/anime/${recommendation.entry.mal_id}`);
                    }}
                  />
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </>
  ) : errMessage ? (
    <p className="text-center text-white">{errMessage}</p>
  ) : (
    <p className="text-center text-white">Loading...</p>
  );
}
