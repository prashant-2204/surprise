/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // If you're using app directory in Next.js 13+
  ],
  theme: {
    extend: {
      colors: {
        romanticPink: "#FFDEE9",
        romanticPurple: "#B5A1FF",
        softWhite: "#FFF8F8",
      },
    },
  },
  plugins: [],
};


