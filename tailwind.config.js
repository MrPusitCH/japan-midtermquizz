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
        'japanese': ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', 'Meiryo', 'sans-serif'],
        'rounded': ['"M PLUS Rounded 1c"', '"Noto Sans JP"', 'sans-serif'],
        'sans': ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', 'Meiryo', '"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
