import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        // SF Pro on Apple devices, Segoe UI Variable on Windows, Inter/system elsewhere
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"Segoe UI Variable Text"',
          '"Segoe UI"',
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        // Apple system blue; 500 = #0071e3 (apple.com), passes AA with white text
        azure: {
          50: "#f0f7ff",
          100: "#dcedff",
          200: "#b9dbff",
          300: "#85c0ff",
          400: "#3d9bff",
          500: "#0071e3",
          600: "#005fc2",
          700: "#004c9c",
          800: "#003f80",
          900: "#00346a",
          950: "#002147",
        },
      },
    },
  },
};
