import Anime from "@/app/_models/anime";
import Home from "@/app/_components/Home";
import { getTopAnime } from "@/app/top-anime/_services/top-anime";

export default async function HomePage() {
  let topAnimesTV: Anime[] = [];
  let topAnimesMovie: Anime[] = [];
  try {
    const resultTV = await getTopAnime("tv");
    const resultMovie = await getTopAnime("movie");
    topAnimesTV = resultTV.data;
    topAnimesMovie = resultMovie.data;
  } catch (error) {}
  return <Home topAnimesTV={topAnimesTV} topAnimesMovie={topAnimesMovie} />;
}
