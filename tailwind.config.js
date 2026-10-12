/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7f8',
          100: '#e3ece3',
          200: '#bfd0c8',
          300: '#9bb5aa',
          400: '#7a9a8d',
          500: '#5f7d71',
          600: '#49685e',
          700: '#384d48',
          800: '#1d2d29',
          900: '#111a17'
        }
      },
      boxShadow: {
        soft: '0 14px 40px rgba(17, 26, 23, 0.12)'
      }
    }
  },
  plugins: []
};
