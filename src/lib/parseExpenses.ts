export type Expense = {
  date: string;       // dd/mm/yyyy
  description: string;
  payment: string;
  condition: string;
  value: number;      // parsed float in BRL
  rawValue: string;
};

function parseBRL(raw: string): number {
  if (!raw) return 0;
  // Remove R$, spaces, dots (thousands), replace comma with dot
  const clean = raw.replace(/R\$\s?/g, "").replace(/\./g, "").replace(",", ".").trim();
  const n = parseFloat(clean);
  return isNaN(n) ? 0 : n;
}

// Rows come in as string[][] starting from the header row (row 2 of sheet).
// Row 0 = headers, Row 1+ = data
export function parseExpenses(rows: string[][]): Expense[] {
  if (rows.length < 2) return [];
  const data = rows.slice(1); // skip header row

  return data
    .map((r) => {
      const rawValue = r[4] ?? "";
      // skip rows with no value or "VARIÁVEL" only
      const value = parseBRL(rawValue.replace(/VARIÁVEL\s?/gi, "").trim());
      return {
        date: (r[0] ?? "").trim(),
        description: (r[1] ?? "").trim(),
        payment: (r[2] ?? "").trim(),
        condition: (r[3] ?? "").trim(),
        value,
        rawValue: rawValue.trim(),
      };
    })
    .filter((e) => e.value > 0);
}

// ── Aggregations ────────────────────────────────────────────────────────────

export function totalGasto(expenses: Expense[]): number {
  return expenses.reduce((s, e) => s + e.value, 0);
}

export function byCategory(expenses: Expense[]): { name: string; value: number }[] {
  const map: Record<string, number> = {};
  for (const e of expenses) {
    const label = e.description || "Outros";
    map[label] = (map[label] ?? 0) + e.value;
  }
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function byMonth(expenses: Expense[]): { month: string; value: number }[] {
  const map: Record<string, number> = {};
  for (const e of expenses) {
    const parts = e.date.split("/");
    if (parts.length < 3) continue;
    const label = `${parts[1]}/${parts[2].slice(-2)}`; // MM/YY
    map[label] = (map[label] ?? 0) + e.value;
  }
  return Object.entries(map).map(([month, value]) => ({ month, value }));
}

export function monthlyFixed(expenses: Expense[]): number {
  return expenses
    .filter((e) => e.condition.toUpperCase() === "MENSAL")
    .reduce((s, e) => s + e.value, 0);
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
}
