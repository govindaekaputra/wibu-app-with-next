import GenreListResponse from "@/app/_models/genre-list-response";
import AnimeListResponse from "../../_models/anime-list-response";

export async function getSearchAnime(
  query: string = "",
  genres: number[] = [],
  page: number = 1
): Promise<AnimeListResponse> {
  const isServer = typeof window === "undefined" ? true : false;
  const res = await fetch(
    `${isServer ? process.env.BASE_URL : ""}/api/anime/search?` +
      new URLSearchParams({
        q: query,
        genres: genres.join(","),
        page: `${page}`,
      })
  );
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result["message"] || "Failed to fetch data");
  }
  return result;
}

export async function getGenres(): Promise<GenreListResponse> {
  const isServer = typeof window === "undefined" ? true : false;
  const res = await fetch(
    `${isServer ? process.env.BASE_URL : ""}/api/anime/genre`
  );
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result["message"] || "Failed to fetch data");
  }
  return result;
}
