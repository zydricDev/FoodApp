module.exports = {
  future: {

  },
  purge: [],
  theme: {
    extend: {
      backgroundColor:{
        'black-t-50': 'rgba(0,0,0,0.5)',
        'red-t-50': 'rgba(249, 0, 0, 0.5)',
        'red-t-75': 'rgba(249, 0, 0, 0.75)',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
