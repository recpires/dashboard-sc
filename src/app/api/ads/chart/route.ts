import { NextResponse } from "next/server";
import { getAdsDailyChart } from "@/lib/googleAds";

export async function GET() {
  try {
    const chart = await getAdsDailyChart();
    return NextResponse.json({ chart });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
