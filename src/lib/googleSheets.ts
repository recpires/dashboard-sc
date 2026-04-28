const BASE = "https://sheets.googleapis.com/v4/spreadsheets";

function key() {
  const k = process.env.GOOGLE_SHEETS_API_KEY;
  if (!k) throw new Error("CREDENTIALS_NOT_CONFIGURED");
  return k;
}

function spreadsheetId() {
  const id = process.env.GOOGLE_SPREADSHEET_ID;
  if (!id) throw new Error("CREDENTIALS_NOT_CONFIGURED");
  return id;
}

export async function getSheetNames(): Promise<{ title: string; sheetId: number }[]> {
  const url = `${BASE}/${spreadsheetId()}?key=${key()}&fields=sheets.properties(title,sheetId)`;
  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Sheets API: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return (json.sheets ?? []).map((s: any) => ({
    title: s.properties?.title ?? "",
    sheetId: s.properties?.sheetId ?? 0,
  }));
}

export async function getSheetData(range: string): Promise<string[][]> {
  const url = `${BASE}/${spreadsheetId()}/values/${encodeURIComponent(range)}?key=${key()}`;
  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Sheets API: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return (json.values ?? []) as string[][];
}
