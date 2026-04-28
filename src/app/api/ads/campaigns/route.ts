import { NextResponse } from "next/server";
import { getAdsCampaigns } from "@/lib/googleAds";

export async function GET() {
  try {
    const campaigns = await getAdsCampaigns();
    return NextResponse.json({ campaigns });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
