// Apenas dados mockados que ainda não migraram para o Supabase
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
  sizes: ["18″ Compact", "24″ Standard", "32″ Pro"],
};

// Se você ainda tem footerLinks aqui, pode removê-los ou mantê-los, mas o Footer
// que criamos acima já possui os links estáticos diretamente no componente.