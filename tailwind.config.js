/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          500: '#4f46e5',
          700: '#3730a3',
        },
      },
    },
  },
  plugins: [],
};
