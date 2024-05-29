import AnimeListResponse from "../../_models/anime-list-response";

export async function getTopAnime(
  type: string,
  page: number = 1
): Promise<AnimeListResponse> {
  const isServer = typeof window === "undefined" ? true : false;
  const res = await fetch(
    `${isServer ? process.env.BASE_URL : ""}/api/anime/top?` +
      new URLSearchParams({ type, page: `${page}` })
  );
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result["message"] || "Failed to fetch data");
  }
  return result;
}
