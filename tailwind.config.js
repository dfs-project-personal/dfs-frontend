/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      transitionDuration: {
        '4000': '4000ms',
        '6000': '6000ms',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite'
      },
      colors: {
        'background': '#e0f4fd',
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

module.exports = withMT(config);

