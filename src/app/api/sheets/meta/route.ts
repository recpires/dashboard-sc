import { NextResponse } from "next/server";
import { getSheetNames } from "@/lib/googleSheets";

export async function GET() {
  try {
    const sheets = await getSheetNames();
    return NextResponse.json({ sheets });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
