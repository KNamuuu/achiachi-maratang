/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8B0000',
        secondary: '#FFFDD0',
        accent: '#FF4500',
        dark: '#1A1A1A',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'cursive'],
        body: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
