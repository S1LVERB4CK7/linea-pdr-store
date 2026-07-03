import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        graySoft: "#F5F7FA",
        silver: "#E9EDF2",
        ink: "#111111",
        blue: "#3B82F6",
        green: "#22C55E",
      },
      borderRadius: {
        brand: "18px",
      },
    },
  },
  plugins: [],
} satisfies Config;
