import Anime from "@/app/_models/anime";
import Home from "@/app/_components/Home";
import { getTopAnime } from "@/app/top-anime/_services/top-anime";

export default async function HomePage() {
  const resultTV = await getTopAnime("tv");
  const resultMovie = await getTopAnime("movie");
  const topAnimesTV: Anime[] = resultTV.data;
  const topAnimesMovie: Anime[] = resultMovie.data;
  return <Home topAnimesTV={topAnimesTV} topAnimesMovie={topAnimesMovie} />;
}
