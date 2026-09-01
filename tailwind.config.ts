import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#18324A",
        muted: "#61758A",
        navy: "#163B67",
        blue: "#3978B7",
        sky: "#EAF4FC",
        mist: "#F5FAFE",
        mint: "#DCEFE9",
        warm: "#F7E8D6",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(22,59,103,.08)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        site: "1240px",
      },
    },
  },
  plugins: [],
} satisfies Config;
