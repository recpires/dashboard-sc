const TOKEN_URL = "https://oauth2.googleapis.com/token";
const ADS_BASE = "https://googleads.googleapis.com/v20";

function dateRange30() {
  const today = new Date();
  const end = today.toISOString().slice(0, 10);
  const start = new Date(today);
  start.setDate(start.getDate() - 29);
  return { start: start.toISOString().slice(0, 10), end };
}

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function adsQuery(query: string): Promise<Record<string, unknown>[]> {
  const token = await getAccessToken();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    "Content-Type": "application/json",
  };
  if (loginId) headers["login-customer-id"] = loginId;

  const res = await fetch(`${ADS_BASE}/customers/${customerId}/googleAds:search`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const text = await res.text();
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Google Ads retornou resposta inválida (HTTP ${res.status}): ${text.slice(0, 300)}`);
  }

  if (!res.ok) {
    const errDetails = (data.error as Record<string, unknown>) ?? data;
    throw new Error(`Google Ads API ${res.status}: ${JSON.stringify(errDetails)}`);
  }

  return (data.results ?? []) as Record<string, unknown>[];
}

export async function getAdsCampaigns() {
  const { start, end } = dateRange30();
  const rows = await adsQuery(`
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.advertising_channel_type,
      metrics.clicks,
      metrics.conversions,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros
    FROM campaign
    WHERE segments.date BETWEEN '${start}' AND '${end}'
      AND campaign.status != 'REMOVED'
    ORDER BY metrics.clicks DESC
    LIMIT 20
  `);

  return rows.map((r) => {
    const c = r.campaign as Record<string, unknown>;
    const m = r.metrics as Record<string, unknown>;
    const channelMap: Record<string, string> = {
      SEARCH: "Search", DISPLAY: "Display", VIDEO: "Video",
      SHOPPING: "Shopping", MULTI_CHANNEL: "Multi", PERFORMANCE_MAX: "PMax",
    };
    return {
      name: c.name as string,
      canal: channelMap[c.advertisingChannelType as string] ?? (c.advertisingChannelType as string),
      cliques: Number(m.clicks ?? 0),
      conv: Math.round(Number(m.conversions ?? 0)),
      ctr: `${(Number(m.ctr ?? 0) * 100).toFixed(1)}%`,
      cpc: `R$${(Number(m.averageCpc ?? 0) / 1_000_000).toFixed(2)}`,
      status: (c.status as string).toLowerCase() === "enabled" ? "ativo" : "pausado",
    };
  });
}

export async function getAdsMetrics() {
  const { start, end } = dateRange30();
  const rows = await adsQuery(`
    SELECT
      metrics.clicks,
      metrics.conversions,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros
    FROM customer
    WHERE segments.date BETWEEN '${start}' AND '${end}'
  `);

  if (!rows.length) return null;
  const m = rows[0].metrics as Record<string, unknown>;
  return {
    clicks: Number(m.clicks ?? 0),
    conversions: Math.round(Number(m.conversions ?? 0)),
    ctr: (Number(m.ctr ?? 0) * 100).toFixed(1) + "%",
    cpc: "R$" + (Number(m.averageCpc ?? 0) / 1_000_000).toFixed(2),
    convRate: Number(m.clicks) > 0 ? ((Number(m.conversions ?? 0) / Number(m.clicks)) * 100).toFixed(1) + "%" : "0%",
    cost: "R$" + (Number(m.costMicros ?? 0) / 1_000_000).toFixed(0),
  };
}

export async function getAdsDailyChart() {
  const { start, end } = dateRange30();
  const rows = await adsQuery(`
    SELECT
      segments.date,
      metrics.clicks,
      metrics.conversions
    FROM customer
    WHERE segments.date BETWEEN '${start}' AND '${end}'
    ORDER BY segments.date ASC
  `);

  return rows.map((r) => {
    const s = r.segments as Record<string, unknown>;
    const m = r.metrics as Record<string, unknown>;
    const d = (s.date as string).slice(5).replace("-", "/");
    return { day: d, clicks: Number(m.clicks ?? 0), conversions: Math.round(Number(m.conversions ?? 0)) };
  });
}
