import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'green_ellipse' : "url('/light-green-ellipse-bg.svg')",
      },
      fontFamily: {
        sans: ['"Inter var", sans-serif'],
      },
      colors: {
        ccGreen: "#4CAD73",
        ccGreenAlt: "#0EB177",
        ccGray: "#BDBDBD",
        ccBlack: "#333333",
        ccFormBg: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
export default config;
