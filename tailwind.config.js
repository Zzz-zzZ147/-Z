/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171717',
        paper: '#F6F4F0',
        mist: '#E8E3DC',
        taupe: '#81776D',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(17, 17, 17, 0.14)',
      },
      letterSpacing: {
        widerest: '0.32em',
      },
    },
  },
  plugins: [],
}
