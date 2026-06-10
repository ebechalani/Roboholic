import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rh: {
          navy:    "#0F2044",
          blue:    "#2563EB",
          sky:     "#3B82F6",
          orange:  "#F97316",
          yellow:  "#FCD34D",
          green:   "#10B981",
          purple:  "#7C3AED",
          pink:    "#EC4899",
          cyan:    "#06B6D4",
          red:     "#EF4444",
          amber:   "#F59E0B",
          teal:    "#0D9488",
          indigo:  "#4F46E5",
          slate:   "#475569",
        },
      },
      animation: {
        "spin-slow":    "spin 10s linear infinite",
        "float":        "float 4s ease-in-out infinite",
        "fade-in-up":   "fadeInUp 0.6s ease-out forwards",
        "pulse-slow":   "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
