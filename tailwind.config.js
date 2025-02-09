/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-scrollbar');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
   
  ],
  darkMode: "class", // Enable dark mode
  
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'custom-gray': '#6E7191',
        'black-primary': {
          100: '#d7d7d7',
          200: '#000000',
          300: '#202224',
          400: '#6E7191',
          500: '#1A1C1F',
          600: '#2B2E32',
          700: '#19171C',
          800: '#101010',
          900: '#EFF0F6',
          910: '#262338',
          920: '#171A1C',
          930: '#14142B',
          940: '#2B2E32',
          950: '#1B2128',
          960: '#232528'
        },
        'gray-primary': {
          100: '#D9DBE9',
          200: '#43424D',
          300: '#848895',
          400: '#8C8E9E',
          500: '#838594',
          600: '#D9DBE9',
          700: '#FCFCFC',
          800: '#43424D',
          900: '#EFF0F6',
          910: '#F7F7FC',
          920: '#76767F',
          930: '#838594',
          940: '#A0A3BD',
          950: '#A0A3BD',
          960: '#534D59'
        },
        // 'blue': {
        //   100: '#039dea',
        //   200: '#34A9F14D',
        //   300: '#eef8fe',
        //   400: '#30A6EF',
        //   500: '#1574EA'
        // },
        // 'red':{
        //   100:'#FB4E4E'
        // },

      },
      fontFamily: {
        title: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'b-gradient': 'linear-gradient(180deg, #1E7FF5 0%, #025ECF 100%)',
        'r-gradient': 'linear-gradient(180deg, #FF4C4C 0%, #D80027 100%)',
        'y-gradient': 'linear-gradient(180deg, #FFC107 0%, #FF9800 100%)',
        'g-gradient': 'linear-gradient(180deg, #28A745 0%, #218838 100%)',
      },
      borderColor: {
        'b-border': '#FFFFFF26',
        'r-border': '#FF4C4C66',
        'y-border': '#FFC10766',
        'g-border': '#28A74566',
      },
      boxShadow: {
        'shadow-1': '0px 4px 7px 0px #2C8DC933',
        'shadow-2': '0px 0px 0px 1.5px #025ECF',
        'r-shadow-1': '0px 4px 7px 0px #FF4C4C33', 
        'r-shadow-2': '0px 0px 0px 1.5px #D80027', 
        'y-shadow-1': '0px 4px 7px 0px #FFC10733',
        'y-shadow-2': '0px 0px 0px 1.5px #FF9800',
        'g-shadow-1': '0px 4px 7px 0px #28A74533', 
        'g-shadow-2': '0px 0px 0px 1.5px #218838',
        'custom-inset': '0px -1px 0px 0px rgba(225, 225, 225, 0.4) inset',
      },
    }
  },
  plugins: [
    plugin({ nocompatible: true }),
    require('tailwind-scrollbar')
  ],
}

