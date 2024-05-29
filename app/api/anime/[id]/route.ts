import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const res = await fetch(`${process.env.BASE_URL_API}/anime/${id}`);
  const result = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { message: result["message"] || "failed to fetch data" },
      { status: 500 }
    );
  }
  return NextResponse.json(result, { status: 200 });
}
