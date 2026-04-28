import { NextResponse } from "next/server";
import { getAdsMetrics } from "@/lib/googleAds";

export async function GET() {
  try {
    const metrics = await getAdsMetrics();
    return NextResponse.json({ metrics });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
