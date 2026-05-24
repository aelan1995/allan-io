import { NextResponse } from "next/server";
import { experiences } from "@/data/experiences";

export const runtime = "nodejs";
export const revalidate = 3600; // CV data rarely changes — cache for 1 hour

export async function GET() {
  return NextResponse.json(experiences);
}
