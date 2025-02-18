/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
      extend: {  
        colors: {
          'primary' : '#23609a',
          'primary-dark' : '#1a4c7c'
        }
      },
  },
  plugins: [],
};