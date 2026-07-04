// Dados mock pro protótipo visual — na integração real isso vem
// da API (/api/products, /api/reviews) via fetch no server component.

export const categories = [
  { name: "Lighting", count: "32 products" },
  { name: "Glue Tabs", count: "58 products" },
  { name: "Carbon Tools", count: "21 products" },
  { name: "Slide Hammers", count: "19 products" },
  { name: "Knockdowns", count: "27 products" },
  { name: "Electronics", count: "14 products" },
  { name: "Repair Kits", count: "23 products" },
  { name: "Accessories", count: "44 products" },
];

export const reviews = [
  {
    name: "Marco T.",
    role: "Mobile PDR, Milan",
    text: "The reflector board changed how fast I can spot secondary dents. Paid for itself in two jobs.",
  },
  {
    name: "Ana P.",
    role: "Shop Owner, São Paulo",
    text: "Ordering across currencies was painless — invoice matched what my card was charged, no surprises.",
  },
  {
    name: "Kevin R.",
    role: "Fleet Tech, Austin",
    text: "Glue tabs hold in Texas heat better than anything I've used before. Restocking the whole van.",
  },
];

export const featuredProduct = {
  sku: "LN-GRB-204",
  name: "Glass LED Reflector Board Pro",
  priceCents: 34900,
  wasCents: 41900,
  currency: "USD",
  rating: 4.9,
  reviewCount: 312,
  stock: "In stock — ships in 24h",
  countries: 38,
  sizes: ["18\u2033 Compact", "24\u2033 Standard", "32\u2033 Pro"],
};
