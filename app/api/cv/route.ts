import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const revalidate = 3600; // CV data rarely changes — cache for 1 hour

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "cv.md");
  const content = await readFile(filePath, "utf-8");
  return new NextResponse(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
