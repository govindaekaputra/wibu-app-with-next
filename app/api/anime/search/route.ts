import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const genres = searchParams.get("genres") || "";
  const page = searchParams.get("page") || "1";
  const res = await fetch(
    `${process.env.BASE_URL_API}/anime?` +
      new URLSearchParams({ q: query, genres, page })
  );
  const result = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { message: result["message"] || "failed to fetch data" },
      { status: 500 }
    );
  }
  return NextResponse.json(result, { status: 200 });
}
