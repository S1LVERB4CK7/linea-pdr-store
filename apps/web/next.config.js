/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // headers de segurança adicionais no lado do front (CSP fica na API
  // pra respostas JSON; aqui cobre o HTML servido pelo Next)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.supabase.co" }],
  },
};

module.exports = nextConfig;
