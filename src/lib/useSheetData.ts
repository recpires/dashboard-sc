"use client";

import { useState, useEffect } from "react";

type SheetResult = {
  rows: string[][];
  loading: boolean;
  error: string | null;
};

export function useSheetData(range: string, spreadsheetId?: string): SheetResult {
  const [rows, setRows] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!range) return;
    setLoading(true);
    setError(null);

    const url = new URL("/api/sheets/data", window.location.origin);
    url.searchParams.append("range", range);
    if (spreadsheetId) url.searchParams.append("spreadsheetId", spreadsheetId);

    fetch(url.toString())
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setRows(data.rows ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [range, spreadsheetId]);

  return { rows, loading, error };
}

type MetaResult = {
  sheets: { title: string; sheetId: number }[];
  loading: boolean;
  error: string | null;
};

export function useSheetMeta(spreadsheetId?: string): MetaResult {
  const [sheets, setSheets] = useState<{ title: string; sheetId: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const url = new URL("/api/sheets/meta", window.location.origin);
    if (spreadsheetId) url.searchParams.append("spreadsheetId", spreadsheetId);

    fetch(url.toString())
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setSheets(data.sheets ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [spreadsheetId]);

  return { sheets, loading, error };
}
