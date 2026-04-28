import { NextRequest, NextResponse } from "next/server";
import { getSheetData } from "@/lib/googleSheets";

// GET /api/sheets/data?range=Sheet1!A1:Z500
export async function GET(req: NextRequest) {
  const range = req.nextUrl.searchParams.get("range");
  if (!range) {
    return NextResponse.json({ error: "Parâmetro 'range' obrigatório. Ex: ?range=Sheet1!A1:Z500" }, { status: 400 });
  }
  try {
    const rows = await getSheetData(range);
    return NextResponse.json({ rows });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
