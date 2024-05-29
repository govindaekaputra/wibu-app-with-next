import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const res = await fetch(
    `${process.env.BASE_URL_API}/anime/${id}/reviews?` +
      new URLSearchParams({ page })
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
