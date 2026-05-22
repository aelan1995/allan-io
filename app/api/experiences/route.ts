import { NextResponse } from "next/server";
import { experiences } from "@/data/experiences";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(experiences);
}
