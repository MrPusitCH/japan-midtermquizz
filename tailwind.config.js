/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kawaii: {
          pink: '#FADADD',
          cream: '#FFF6E5',
          blue: '#CDEFFF',
          yellow: '#FFF3B0',
          purple: '#E5D4FF',
        }
      },
      fontFamily: {
        'japanese': ['"M PLUS Rounded 1c"', 'sans-serif'],
        'noto': ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
