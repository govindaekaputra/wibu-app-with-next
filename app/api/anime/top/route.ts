import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") || "tv";
  const page = searchParams.get("page") || "1";
  const res = await fetch(
    `${process.env.BASE_URL_API}/top/anime?` +
      new URLSearchParams({ type, page })
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
