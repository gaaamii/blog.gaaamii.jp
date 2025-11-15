import { NextRequest, NextResponse } from "next/server";
import { buildPost, buildPosts } from "../../../../mocks/data/post";

export async function GET() {
  return NextResponse.json(buildPosts());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ post: buildPost(body.post) });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ post: buildPost(body.post) });
}
