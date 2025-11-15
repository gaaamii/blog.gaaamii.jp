import { NextRequest, NextResponse } from "next/server";
import { buildPost } from "../../../../../../mocks/data/post";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return NextResponse.json(buildPost({ id: Number(id) }));
}
