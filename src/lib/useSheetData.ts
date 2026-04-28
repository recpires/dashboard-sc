"use client";

import { useState, useEffect } from "react";

type SheetResult = {
  rows: string[][];
  loading: boolean;
  error: string | null;
};

export function useSheetData(range: string): SheetResult {
  const [rows, setRows] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!range) return;
    setLoading(true);
    setError(null);

    fetch(`/api/sheets/data?range=${encodeURIComponent(range)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setRows(data.rows ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [range]);

  return { rows, loading, error };
}

type MetaResult = {
  sheets: { title: string; sheetId: number }[];
  loading: boolean;
  error: string | null;
};

export function useSheetMeta(): MetaResult {
  const [sheets, setSheets] = useState<{ title: string; sheetId: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/sheets/meta")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setSheets(data.sheets ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { sheets, loading, error };
}
