import { NextRequest, NextResponse } from "next/server";
import { getSheetNames } from "@/lib/googleSheets";

export async function GET(req: NextRequest) {
  const spreadsheetId = req.nextUrl.searchParams.get("spreadsheetId") || undefined;
  try {
    const sheets = await getSheetNames(spreadsheetId);
    return NextResponse.json({ sheets });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
