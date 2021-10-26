module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['Barlow'],
    },
    extend: {
      colors: {
        gray: {
          100: '#F7F7FC',
          200: '#E3E3FC',
          300: '#9999CC',
          400: '#6B6B99',
          500: '#5D5D8E',
          600: '#4B4B81',
          700: '#3A3A75',
          800: '#2E2E53',
          900: '#17172F',
        },
        red: {
          500: '#FF4D79'
        },
        green: {
          500: '#21D99B'
        },
        shade: {
          2: '#E2E1EB'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
