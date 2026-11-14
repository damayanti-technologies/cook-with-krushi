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
        background: "#FAF8F2", // Warm Ivory
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#55765C", // Sage Green
          hover: "#46624C",
          light: "#E7EFE5", // Light Sage
          dark: "#294B35", // Deep Green
        },
        deep: {
          green: "#294B35",
          hover: "#1F3827",
        },
        sage: {
          50: "#F4F7F3",
          100: "#E7EFE5",
          200: "#D0DFC9",
          500: "#55765C",
          600: "#44604A",
          700: "#294B35",
          800: "#1E3727",
          900: "#132319",
        },
        peach: {
          DEFAULT: "#F3D9C8", // Warm Peach
          light: "#FDF5F0",
          dark: "#E3BEA8",
        },
        terracotta: {
          DEFAULT: "#BD765B",
          hover: "#A6634A",
          light: "#F8ECE7",
        },
        charcoal: {
          DEFAULT: "#292D29",
          muted: "#777B73",
          light: "#A4A8A1",
        },
        border: "#EAE7DF",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        telugu: ["Noto Sans Telugu", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(41, 75, 53, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)",
        card: "0 4px 20px -2px rgba(41, 75, 53, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        lifted: "0 10px 25px -4px rgba(41, 75, 53, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
