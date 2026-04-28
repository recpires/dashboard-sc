export const sparkRevenue = [42, 55, 48, 63, 58, 72, 68, 80, 75, 88, 92, 98];
export const sparkAds = [12, 18, 15, 22, 20, 28, 25, 30, 27, 35, 32, 40];
export const sparkConversions = [8, 12, 10, 16, 14, 20, 18, 24, 22, 28, 26, 32];
export const sparkPosts = [2, 3, 2, 4, 3, 5, 4, 6, 4, 7, 5, 8];

export const adsLineData = [
  { day: "01/04", clicks: 420, conversions: 38 },
  { day: "05/04", clicks: 580, conversions: 52 },
  { day: "09/04", clicks: 495, conversions: 44 },
  { day: "13/04", clicks: 720, conversions: 68 },
  { day: "17/04", clicks: 680, conversions: 61 },
  { day: "21/04", clicks: 850, conversions: 79 },
  { day: "25/04", clicks: 790, conversions: 73 },
  { day: "27/04", clicks: 920, conversions: 88 },
];

export const sheetsBarData = [
  { month: "Jan", receita: 28500, custo: 12000 },
  { month: "Fev", receita: 32100, custo: 13500 },
  { month: "Mar", receita: 38700, custo: 15200 },
  { month: "Abr", receita: 45200, custo: 17800 },
  { month: "Mai", receita: 41800, custo: 16400 },
  { month: "Jun", receita: 52300, custo: 19600 },
];

export const instagramPosts = [
  {
    id: "1", date: "28 Abr", day: "Seg", time: "10:00",
    caption: "Lançamento exclusivo ✨ Conheça nossa nova linha",
    type: "Carrossel", status: "scheduled" as const,
    gradient: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
  },
  {
    id: "2", date: "29 Abr", day: "Ter", time: "14:00",
    caption: "Bastidores da equipe 🎬 Um dia na SynapseCode",
    type: "Reels", status: "scheduled" as const,
    gradient: "linear-gradient(135deg, #d946ef, #f97316)",
  },
  {
    id: "3", date: "27 Abr", day: "Dom", time: "09:00",
    caption: "Dashboard de marketing ao vivo! 📊",
    type: "Story", status: "published" as const,
    gradient: "linear-gradient(135deg, #34d399, #06b6d4)",
  },
  {
    id: "4", date: "30 Abr", day: "Qua", time: "18:00",
    caption: "Métricas de abril — resultado incrível 🚀",
    type: "Feed", status: "draft" as const,
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
  {
    id: "5", date: "01 Mai", day: "Qui", time: "11:00",
    caption: "Dicas de growth hacking para PMEs 💡",
    type: "Carrossel", status: "scheduled" as const,
    gradient: "linear-gradient(135deg, #8b5cf6, #d946ef)",
  },
  {
    id: "6", date: "02 Mai", day: "Sex", time: "16:00",
    caption: "Parceria confirmada! Bem-vindo ao time 🤝",
    type: "Feed", status: "draft" as const,
    gradient: "linear-gradient(135deg, #06b6d4, #34d399)",
  },
];

export const sheetsTableData = [
  { campaign: "Brand Awareness Q2", canal: "Meta Ads", investimento: "R$ 4.200", receita: "R$ 18.900", roas: "4.5x", status: "ativo" },
  { campaign: "Lançamento Produto X", canal: "Google Ads", investimento: "R$ 6.800", receita: "R$ 34.000", roas: "5.0x", status: "ativo" },
  { campaign: "Email Nurturing Abr", canal: "ActiveCampaign", investimento: "R$ 850", receita: "R$ 5.100", roas: "6.0x", status: "ativo" },
  { campaign: "SEO — Blog Posts", canal: "Orgânico", investimento: "R$ 2.100", receita: "R$ 14.700", roas: "7.0x", status: "ativo" },
];
