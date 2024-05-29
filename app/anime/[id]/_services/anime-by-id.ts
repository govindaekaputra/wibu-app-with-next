import AnimeDetailResponse from "@/app/_models/anime-detail-response";
import EpidodesResponse from "@/app/_models/episodes-response";
import { RecommendationListResponse } from "@/app/_models/recommendation";
import { ReviewsResponse } from "@/app/_models/reviews-response";

export async function getAnimeById(id: string): Promise<AnimeDetailResponse> {
  const isServer = typeof window === "undefined" ? true : false;
  const res = await fetch(
    `${isServer ? process.env.BASE_URL : ""}/api/anime/${id}`
  );
  const result = await res.json();
  if (res.status != 200) {
    throw new Error(result["message"] || "Failed to fetch data");
  }
  return result;
}

export async function getAnimeVideoEpisodesById(
  id: string,
  page: string = "1"
): Promise<EpidodesResponse> {
  const isServer = typeof window === "undefined" ? true : false;
  const res = await fetch(
    `${isServer ? process.env.BASE_URL : ""}/api/anime/${id}/video-episodes?` +
      new URLSearchParams({ page })
  );
  const result = await res.json();
  if (res.status != 200) {
    throw new Error(result["message"] || "Failed to fetch data");
  }
  return result;
}

export async function getAnimeReviewsById(
  id: string,
  page: string = "1"
): Promise<ReviewsResponse> {
  const isServer = typeof window === "undefined" ? true : false;
  const res = await fetch(
    `${isServer ? process.env.BASE_URL : ""}/api/anime/${id}/reviews?` +
      new URLSearchParams({ page })
  );
  const result = await res.json();
  if (res.status != 200) {
    throw new Error(result["message"] || "Failed to fetch data");
  }
  return result;
}

export async function getAnimeRecommendationsById(
  id: string
): Promise<RecommendationListResponse> {
  const isServer = typeof window === "undefined" ? true : false;
  const res = await fetch(
    `${isServer ? process.env.BASE_URL : ""}/api/anime/${id}/recommendations`
  );
  const result = await res.json();
  if (res.status != 200) {
    throw new Error(result["message"] || "Failed to fetch data");
  }
  return result;
}
