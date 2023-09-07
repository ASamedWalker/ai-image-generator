import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();

  console.log(title);
  return NextResponse.json(
    { title},
    { status: 200 }
  )
}