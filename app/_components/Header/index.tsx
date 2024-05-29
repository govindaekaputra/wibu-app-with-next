"use client";

import { useSearchAnime } from "@/app/_search/_hooks/useSearchAnime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const router = useRouter();
  const {
    query,
    genres,
    genresOptions,
    updateQuery,
    updateGenres,
    fetchGenres,
  } = useSearchAnime();

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full p-3 text-white bg-[#23252b] sticky top-0 z-10">
      <div className="relative flex items-center gap-3 justify-between max-w-[1360px] m-auto">
        <Link href={"/"} className="text-xl md:text-2xl">
          Wibu App
        </Link>
        <div className="flex gap-3 text-xs md:text-sm">
          <button
            className="bg-white text-black rounded-full p-3 hover:bg-gray-200"
            onClick={() => {
              setIsShowSearch((prev) => !prev);
              setIsShowFilter(false);
            }}
          >
            Search &#128269;
          </button>
          <button
            className="bg-white text-black rounded-full p-3 hover:bg-gray-200"
            onClick={() => {
              setIsShowFilter((prev) => !prev);
              setIsShowSearch(false);
            }}
          >
            Filter &#128295;
          </button>
        </div>
        {isShowSearch && (
          <div className="absolute bottom-[-85px] z-10 shadow-lg p-3 flex items-center gap-3 w-full h-[60px] bg-gray-100 text-black">
            <input
              type="text"
              placeholder="Enter title"
              className="flex-1 focus:outline-none bg-gray-100"
              value={query}
              onChange={(e) => {
                updateQuery(e.target.value);
              }}
            />
            <button
              className="hover:underline"
              onClick={() => {
                window.location.href =
                  "/anime?" +
                  new URLSearchParams({
                    q: query,
                    genres: genres.join(","),
                    page: "1",
                  });
              }}
            >
              submit
            </button>
          </div>
        )}
        {isShowFilter && (
          <div className="absolute bottom-[-385px] z-10 p-3 flex flex-col gap-3 w-full bg-gray-100 text-black">
            <div className="h-[300px] overflow-x-hidden overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {genresOptions.map((item) => (
                  <div key={item.mal_id}>
                    <input
                      type="checkbox"
                      id={`genre-${item.mal_id}`}
                      name={`genre-${item.mal_id}`}
                      checked={genres.includes(item.mal_id)}
                      value={item.mal_id}
                      onChange={(e) => {
                        updateGenres(parseInt(e.target.value));
                      }}
                    />
                    <label htmlFor={`genre-${item.mal_id}`}> {item.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="border-[1px] border-gray-400 w-fit px-3 py-1 bg-white text-black"
              onClick={() => {
                window.location.href =
                  "/anime?" +
                  new URLSearchParams({
                    q: query,
                    genres: genres.join(","),
                    page: "1",
                  });
              }}
            >
              submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
